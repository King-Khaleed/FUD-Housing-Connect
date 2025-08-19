
"use client"

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";
import { Users, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";

export function UserModeToggle() {
  const { userMode, setUserMode } = useAppContext();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const handleToggle = (checked: boolean) => {
    const newMode = checked ? 'agent' : 'student';
    setUserMode(newMode);
    if (newMode === 'agent') {
      router.push('/agent/dashboard');
    } else {
      router.push('/');
    }
  };
  
  if (!mounted) {
    return (
        <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <div className="h-6 w-11 rounded-full bg-input" />
            <Briefcase className="h-5 w-5 text-muted-foreground" />
        </div>
    );
  }


  return (
    <div className="flex items-center space-x-2">
      <Users className="h-5 w-5 text-muted-foreground" />
      <Switch
        id="user-mode"
        checked={userMode === 'agent'}
        onCheckedChange={handleToggle}
        aria-label="Switch between student and agent mode"
      />
      <Briefcase className="h-5 w-5 text-muted-foreground" />
    </div>
  );
}
