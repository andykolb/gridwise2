import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Copy, Check, Users, Gift } from 'lucide-react';
import { toast } from 'sonner';

export function InviteCard() {
  const { user } = useUser();
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const language = user.language;
  const inviteLink = `${window.location.origin}?ref=${user.referralCode}`;

  const t = {
    title: { en: 'Invite a Colleague', de: 'Kollegen einladen' },
    subtitle: { en: '+100 XP for each invite', de: '+100 XP für jede Einladung' },
    copyLink: { en: 'Copy Invite Link', de: 'Einladungslink kopieren' },
    copyMessage: { en: 'Copy Message', de: 'Nachricht kopieren' },
    copied: { en: 'Copied!', de: 'Kopiert!' },
    invitesSent: { en: 'Invites sent', de: 'Einladungen gesendet' },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast.success(t.copied[language]);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyMessage = () => {
    const message = language === 'en'
      ? `Join me on GridWise to learn about energy markets! ${inviteLink}`
      : `Komm zu GridWise und lerne über Energiemärkte! ${inviteLink}`;
    navigator.clipboard.writeText(message);
    setCopied(true);
    toast.success(t.copied[language]);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-secondary/10 via-primary/5 to-transparent rounded-2xl p-5 border border-secondary/20"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Users className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">{t.title[language]}</h3>
            <div className="flex items-center gap-1 text-xs text-gold font-medium">
              <Gift className="w-3 h-3" />
              {t.subtitle[language]}
            </div>
          </div>
        </div>
      </div>

      {user.invitesSent > 0 && (
        <p className="text-xs text-muted-foreground mb-3">
          {t.invitesSent[language]}: {user.invitesSent}
        </p>
      )}

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleCopy} className="flex-1">
          {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
          {t.copyLink[language]}
        </Button>
        <Button variant="outline" size="sm" onClick={handleCopyMessage} className="flex-1">
          {t.copyMessage[language]}
        </Button>
      </div>
    </motion.div>
  );
}
