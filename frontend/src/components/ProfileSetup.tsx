import { useState } from 'react';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfileSetup() {
  const [name, setName] = useState('');
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    try {
      await saveProfile.mutateAsync({ name: name.trim() });
    } catch (error) {
      console.error('Profile setup error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="border-[3px] border-white bg-white p-8 max-w-md w-full">
        <h2 className="text-3xl font-black uppercase mb-4">WELCOME TO GAMI</h2>
        <p className="text-sm font-mono mb-6 opacity-70">
          PLEASE ENTER YOUR NAME TO CONTINUE
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="profile-name" className="font-bold uppercase text-xs">YOUR NAME</Label>
            <Input
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-[3px] border-black rounded-none font-mono"
              placeholder="ENTER YOUR NAME"
            />
          </div>
          
          <button
            type="submit"
            disabled={saveProfile.isPending || !name.trim()}
            className="w-full px-6 py-3 border-[3px] border-black bg-gami-purple text-white font-black uppercase hover:bg-black transition-colors disabled:opacity-50"
          >
            {saveProfile.isPending ? 'SAVING...' : 'CONTINUE'}
          </button>
        </form>
      </div>
    </div>
  );
}
