# Gami Protocol ICO Website Specification

## Overview
A Neo-Brutalist ICO website for the Gami Protocol (GAMI token) featuring a stark black, white, and purple design with asymmetric layouts and raw HTML elements.

## Design Requirements
- Color palette: Black (#000000), White (#FFFFFF), Gami Purple (#6E3CFB)
- Typography: Monospace fonts for body/data, bold all-caps sans-serif for headlines
- Borders: 3px minimum, black, no shadows
- No gradients, rounded corners, or soft shadows
- Asymmetric grid layouts with overlapping sections
- Sharp hover effects: color inversion or 2px offset
- Use native HTML elements like `<progress>` and `<marquee>`

## Core Features

### Hero Section
- Main headline: "GAMI: THE STRIPE OF GAMIFICATION"
- Subheadline: "Universal Identity Layer for a $3.3 Billion Global Gamer Market"
- Live countdown timer to ICO start/end date
- Scrolling marquee banner for announcements and disclaimers

### KYC Registration Gateway
- Fixed/sticky asymmetric block
- Prominent "SECURE ALLOCATION" CTA button
- Label: "KYC GATEWAY: IDENTITY VERIFICATION REQUIRED"
- Mock KYC integration ready

### Market Data Display
- Central data tile highlighting "3.3 BILLION GLOBAL GAMERS NEED A UNIVERSAL IDENTITY. GAMI IS THE PROTOCOL"
- Key numbers displayed in Gami Purple

### Legal Documentation Hub
- Text-only section with document links:
  - White Paper V1.1 (PDF: 2.1 MB)
  - Tokenomics Paper (TXT: 88 KB)
  - Terms & Conditions (HTML)

### Supply Information Block
- Headline: "TOTAL SUPPLY: 1,000,000,000 FIXED"
- Tagline: "NO INFLATION GAMES"
- Two data tiles in monospace:
  - Total Supply: 1,000,000,000
  - Circulating Supply (Post-TGE): Mock live data
- Ready for Multicall3 EVM Testnet integration

### Vesting Schedule Visualization
- Console-style segmented progress bars
- Three segments:
  - TEAM (20%) - CLIFF: 12M | VEST: 36M
  - INVESTORS (30%) - CLIFF: 6M | VEST: 24M
  - PARTNERS (10%) - CLIFF: 0M | VEST: 18M
- Statement: "ALIGNMENT: 12 MONTH CLIFF"

### Audit Verification Badge
- Fixed position bottom-right
- Text: "SMART CONTRACTS: AUDITED [LINK]"
- Always visible across all sections

### AI Mechanism Block
- ASCII-style flow diagram with thick bordered boxes and arrows
- Flow: [INPUT: PROTOCOL REVENUE] → [MCP CORE ANALYSIS] → [OUTPUT: DYNAMIC XP:GAMI RATE]
- System status box: "SYSTEM STATUS: EMISSION INVARIANT MAINTAINED" with pulsating border

### Dual-Token Information
- Two separated data boxes:
  - XP (Purple accent): SOULBOUND PROOF-OF-ENGAGEMENT
  - GAMI (Black/White): LIQUID UTILITY

### ICO Progress Visualization
- Circular progress ring filling with Gami Purple
- Display: "ALLOCATION RAISED: [X/Y] GAMI" and "PROGRESS: [Z]%"

## Technical Requirements
- Responsive layout maintaining asymmetric design
- All elements clearly bordered and labeled
- Mock data placeholders for dynamic integration
- Ready for blockchain data integration
- All content in English

## Backend Data Storage
The backend should store:
- ICO configuration data (start/end dates, target amounts)
- KYC registration submissions
- Document metadata and links
- System status and announcement data
- Mock supply and progress data for display

## Backend Operations
- Serve ICO countdown and progress data
- Handle KYC registration form submissions
- Provide document download links
- Serve system status updates
- Return mock blockchain data for supply information
