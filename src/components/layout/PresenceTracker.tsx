'use client';

import { usePresence } from '@/hooks/useLiveVisitors';

export default function PresenceTracker() {
  usePresence();
  return null;
}
