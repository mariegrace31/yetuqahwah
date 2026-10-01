'use client';

import { useEffect } from 'react';

export default function InviteLinkRedirect() {
  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const type = fragment.get('type');

    if (
      ['invite', 'recovery'].includes(type) &&
      fragment.get('access_token') &&
      fragment.get('refresh_token')
    ) {
      window.location.replace(`/auth/confirm${window.location.search}${window.location.hash}`);
    }
  }, []);

  return null;
}
