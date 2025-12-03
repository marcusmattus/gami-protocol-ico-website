import AccessControl "authorization/access-control";
import Principal "mo:base/Principal";
import OrderedMap "mo:base/OrderedMap";
import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();

  // Initialize auth (first caller becomes admin, others become users)
  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    // Admin-only check happens inside
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  public type UserProfile = {
    name : Text;
    // Other user metadata if needed
  };

  transient let principalMap = OrderedMap.Make<Principal>(Principal.compare);
  var userProfiles = principalMap.empty<UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can save profiles");
    };
    principalMap.get(userProfiles, caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Debug.trap("Unauthorized: Can only view your own profile");
    };
    principalMap.get(userProfiles, user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles := principalMap.put(userProfiles, caller, profile);
  };

  // Storage for documents and files
  let storage = Storage.new();
  include MixinStorage(storage);

  // ICO Configuration
  type ICOConfig = {
    startTime : Time.Time;
    endTime : Time.Time;
    targetAmount : Nat;
    totalSupply : Nat;
  };

  var icoConfig : ICOConfig = {
    startTime = 0;
    endTime = 0;
    targetAmount = 0;
    totalSupply = 1000000000;
  };

  // KYC Registration
  type KYCSubmission = {
    id : Text;
    name : Text;
    email : Text;
    status : Text;
    submittedAt : Time.Time;
  };

  var kycSubmissions = principalMap.empty<KYCSubmission>();

  // Document Metadata
  type Document = {
    id : Text;
    title : Text;
    fileType : Text;
    size : Text;
    link : Text;
  };

  transient let textMap = OrderedMap.Make<Text>(Text.compare);
  var documents = textMap.empty<Document>();

  // System Status and Announcements
  type SystemStatus = {
    status : Text;
    lastUpdated : Time.Time;
  };

  var systemStatus : SystemStatus = {
    status = "EMISSION INVARIANT MAINTAINED";
    lastUpdated = Time.now();
  };

  // ICO Progress Data
  type ICOProgress = {
    amountRaised : Nat;
    progressPercent : Nat;
  };

  var icoProgress : ICOProgress = {
    amountRaised = 0;
    progressPercent = 0;
  };

  // Public Functions

  // Get ICO Configuration
  public query func getICOConfig() : async ICOConfig {
    icoConfig;
  };

  // Update ICO Configuration (Admin Only)
  public shared ({ caller }) func updateICOConfig(config : ICOConfig) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update ICO config");
    };
    icoConfig := config;
  };

  // Submit KYC Registration (User Only)
  public shared ({ caller }) func submitKYC(name : Text, email : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only authenticated users can submit KYC");
    };
    
    let kyc : KYCSubmission = {
      id = Principal.toText(caller);
      name = name;
      email = email;
      status = "PENDING";
      submittedAt = Time.now();
    };
    
    kycSubmissions := principalMap.put(kycSubmissions, caller, kyc);
  };

  // Get KYC Submission Status (User can view own, Admin can view any)
  public query ({ caller }) func getKYCStatus(user : Principal) : async ?KYCSubmission {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Debug.trap("Unauthorized: Can only view your own KYC submission");
    };
    principalMap.get(kycSubmissions, user);
  };

  // Get Caller's KYC Status
  public query ({ caller }) func getCallerKYCStatus() : async ?KYCSubmission {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only authenticated users can view KYC status");
    };
    principalMap.get(kycSubmissions, caller);
  };

  // Update KYC Status (Admin Only)
  public shared ({ caller }) func updateKYCStatus(user : Principal, status : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update KYC status");
    };
    
    switch (principalMap.get(kycSubmissions, user)) {
      case (?kyc) {
        let updatedKYC : KYCSubmission = {
          id = kyc.id;
          name = kyc.name;
          email = kyc.email;
          status = status;
          submittedAt = kyc.submittedAt;
        };
        kycSubmissions := principalMap.put(kycSubmissions, user, updatedKYC);
      };
      case null {
        Debug.trap("KYC submission not found");
      };
    };
  };

  // Add Document Metadata (Admin Only)
  public shared ({ caller }) func addDocument(doc : Document) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add documents");
    };
    documents := textMap.put(documents, doc.id, doc);
  };

  // Get All Documents (Public)
  public query func getDocuments() : async [Document] {
    let entries = textMap.entries(documents);
    var docs : [Document] = [];
    for ((_, doc) in entries) {
      docs := Array.append(docs, [doc]);
    };
    docs;
  };

  // Update System Status (Admin Only)
  public shared ({ caller }) func updateSystemStatus(status : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update system status");
    };
    systemStatus := {
      status;
      lastUpdated = Time.now();
    };
  };

  // Get System Status (Public)
  public query func getSystemStatus() : async SystemStatus {
    systemStatus;
  };

  // Update ICO Progress (Admin Only)
  public shared ({ caller }) func updateICOProgress(progress : ICOProgress) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update ICO progress");
    };
    icoProgress := progress;
  };

  // Get ICO Progress (Public)
  public query func getICOProgress() : async ICOProgress {
    icoProgress;
  };

  // Get Total Supply (Public)
  public query func getTotalSupply() : async Nat {
    icoConfig.totalSupply;
  };

  // Get Circulating Supply (Public - Mock Data)
  public query func getCirculatingSupply() : async Nat {
    800000000; // Mock data
  };
};
