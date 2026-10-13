'use client';

import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function PasswordField({ label, name = 'password', autoComplete, required = false, minLength }) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="block text-sm">
      {label}
      <span className="relative mt-1 block">
        <input
          required={required}
          minLength={minLength}
          name={name}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          className="w-full rounded border border-yq_lightchoc px-3 py-3 pr-12 transition focus:outline-none focus:shadow-[0_0_0_4px_rgba(60,36,21,0.12)]"
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-yq_main hover:text-yq_choc focus:outline-none focus-visible:ring-2 focus-visible:ring-yq_choc"
        >
          {visible ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
        </button>
      </span>
    </label>
  );
}
