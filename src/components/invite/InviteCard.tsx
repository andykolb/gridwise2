import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Users, MessageSquare, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';

interface InviteCardProps {
  compact?: boolean;
}

export function InviteCard({ compact = false }: InviteCardProps) {
  const { user } = useUser();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  if (!user) return null;

  const language = user.language;
  const inviteLink = `${window.location.origin}?ref=${user.referralCode}`;

  const t = {
    title: {
      en: 'Invite a colleague',
      de: 'Kollegen einladen',
    },
    subtitle: {
      en: 'Learn together and climb the leaderboard.',
      de: 'Lernt gemeinsam und klettert im Ranking.',
    },
    copyLink: {
      en: 'Copy Invite Link',
      de: 'Link kopieren',
    },
    copyMessage: {
      en: 'Copy Message',
      de: 'Nachricht kopieren',
    },
    copied: {
      en: 'Copied!',
      de: 'Kopiert!',
    },
    reward: {
      en: '+100 XP for each invite',
      de: '+100 XP pro Einladung',
    },
    invitesSent: {
      en: 'colleagues invited',
      de: 'Kollegen eingeladen',
    },
    linkCopied: {
      en: 'Invite link copied to clipboard!',
      de: 'Einladungslink in die Zwischenablage kopiert!',
    },
    messageCopied: {
      en: 'Invite message copied to clipboard!',
      de: 'Einladungsnachricht in die Zwischenablage kopiert!',
    },
  };

  const inviteMessageEN = `Join me on GridWise 🎯
Let's level up our energy market knowledge and compete on the leaderboard.
Sign up here: ${inviteLink}`;

  const inviteMessageDE = `Mach mit bei GridWise 🎯
Lass uns gemeinsam unser Energiemarkt-Wissen verbessern und im Ranking messen.
Anmeldung: ${inviteLink}`;

  const inviteMessage = language === 'en' ? inviteMessageEN : inviteMessageDE;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopiedLink(true);
      toast.success(t.linkCopied[language]);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(inviteMessage);
      setCopiedMessage(true);
      toast.success(t.messageCopied[language]);
      setTimeout(() => setCopiedMessage(false), 2000);
    } catch (err) {
      toast.error('Failed to copy message');
    }
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-4 border border-border shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <span className="font-semibold">{t.title[language]}</span>
              <p className="text-xs text-muted-foreground">{t.reward[language]}</p>
            </div>
          </div>
          <Button size="sm" variant="secondary" onClick={handleCopyLink}>
            {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-secondary/10 via-primary/5 to-transparent rounded-2xl p-5 border border-secondary/20 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
          <Users className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-bold text-lg">{t.title[language]}</h3>
          <p className="text-sm text-muted-foreground">{t.subtitle[language]}</p>
        </div>
      </div>

      {/* Reward Badge */}
      <div className="flex items-center gap-2 mb-4 bg-gold/10 text-gold rounded-lg px-3 py-2 w-fit">
        <Gift className="w-4 h-4" />
        <span className="text-sm font-medium">{t.reward[language]}</span>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="gradient"
          size="sm"
          onClick={handleCopyLink}
          className="gap-2"
        >
          {copiedLink ? (
            <>
              <Check className="w-4 h-4" />
              {t.copied[language]}
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              {t.copyLink[language]}
            </>
          )}
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopyMessage}
          className="gap-2"
        >
          {copiedMessage ? (
            <>
              <Check className="w-4 h-4" />
              {t.copied[language]}
            </>
          ) : (
            <>
              <MessageSquare className="w-4 h-4" />
              {t.copyMessage[language]}
            </>
          )}
        </Button>
      </div>

      {/* Invite Stats */}
      {user.invitesSent > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            <span className="font-bold text-foreground">{user.invitesSent}</span>{' '}
            {t.invitesSent[language]}
          </p>
        </div>
      )}
    </motion.div>
  );
}
