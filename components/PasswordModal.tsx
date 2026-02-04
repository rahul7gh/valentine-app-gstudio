import React, { useEffect, useState } from "react";
import { X, Lock } from "lucide-react";

type PasswordModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  title?: string;
};

const PasswordModal: React.FC<PasswordModalProps> = ({
  open,
  onClose,
  onSubmit,
  title = "Enter Password",
}) => {
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!open) setPassword("");
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button
          onClick={onClose}
          aria-label="Close"
          style={styles.closeButton}
        >
          <X size={20} />
        </button>

        <div style={styles.header}>
          <Lock size={20} />
          <h2 style={styles.title}>{title}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            autoFocus
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.submit}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modal: {
    background: "#fff",
    width: "100%",
    maxWidth: 360,
    padding: 24,
    borderRadius: 8,
    position: "relative",
    boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  title: {
    margin: 0,
    fontSize: 18,
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    fontSize: 14,
    borderRadius: 4,
    border: "1px solid #ccc",
    marginBottom: 12,
    outline: "none",
  },
  submit: {
    width: "100%",
    padding: "10px",
    fontSize: 14,
    borderRadius: 4,
    border: "none",
    background: "#000",
    color: "#fff",
    cursor: "pointer",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
};

export default PasswordModal;
