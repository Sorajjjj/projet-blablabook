"use client";
import styles from "./parametre.module.css";
import Header from "@/components/blablabook/Header";
import Footer from "@/components/blablabook/footer";
import { useEffect, useState } from "react";

interface Settings {
  username: string;
  email: string;
  isActive: boolean;
  theme: "light" | "dark";
}

export default function ParametrePage() {
  //   For a better UX otherwise, user sees empty page
  const [loading, setLoading] = useState(true);
  // [GET SETTINGS PAGE WITH UPDATED DATA]
  const [settings, setSettings] = useState<Settings | null>(null);
  // [UPDATE USERNAME]
  const [newUsername, setNewUsername] = useState("");
  // [UPDATE EMAIL]
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  // [UPDATE PASSWORD]
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // [MANAGE ERRORS]
  const [pageError, setPageError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  // [MANAGE SAVING PROCESS]
  // In case of delay
  const [saving, setSaving] = useState(false);
  const [emailSaving, setEmailSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  // [MANAGE SUCCESS]
  const [success, setSuccess] = useState<string | null>(null);
  const [emailSuccess, setEmailSuccess] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  async function handleUsernameUpdate() {
    // Clear previous messages if exists
    setFormError(null);
    setSuccess(null);

    const trimmedUsername = newUsername.trim();

    if (!trimmedUsername) {
      setFormError("Veuillez entrer un nouvel identifiant");
      return;
    }

    if (trimmedUsername.length < 2) {
      setFormError("Identifiant trop court (min. 2 caractères)");
      return;
    }

    if (trimmedUsername.length > 50) {
      setFormError("Identifiant trop long (max. 50 caractères)");
      return;
    }

    try {
      setSaving(true);

      // simulate delay to show the loading button...
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch(
        "http://localhost:4000/api/settings/username",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: trimmedUsername,
          }),
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const updatedSettings: Settings = await response.json();

      setSettings(updatedSettings);
      setNewUsername("");
      setSuccess("Nouvel identifiant enregistré avec succès !");
    } catch (err) {
      if (err instanceof Error) {
        setFormError(err.message);
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleEmailUpdate() {
    setEmailError(null);
    setEmailSuccess(null);

    const trimmedEmail = newEmail.trim();
    const trimmedConfirmEmail = confirmEmail.trim();

    if (!trimmedEmail || !trimmedConfirmEmail) {
      setEmailError("Veuillez remplir les deux champs");
      return;
    }

    if (trimmedEmail !== trimmedConfirmEmail) {
      setEmailError("Les adresses e-mail ne correspondent pas");
      return;
    }

    try {
      setEmailSaving(true);

      // simulate delay to show the loading button...
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch("http://localhost:4000/api/settings/email", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: trimmedEmail,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const updatedSettings: Settings = await response.json();

      setSettings(updatedSettings);
      setNewEmail("");
      setConfirmEmail("");
      setEmailSuccess("Nouvelle adresse e-mail enregistrée avec succès !");
    } catch (err) {
      if (err instanceof Error) {
        setEmailError(err.message);
      }
    } finally {
      setEmailSaving(false);
    }
  }

  async function handlePasswordUpdate() {
    setPasswordError(null);
    setPasswordSuccess(null);

    const trimmedCurrentPassword = currentPassword.trim();
    const trimmedNewPassword = newPassword.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (
      !trimmedCurrentPassword ||
      !trimmedNewPassword ||
      !trimmedConfirmPassword
    ) {
      setPasswordError("Veuillez remplir tous les champs");
      return;
    }

    if (trimmedNewPassword.length < 8) {
      setPasswordError("Mot de passe trop court (min. 8 caractères)");
      return;
    }

    if (trimmedNewPassword !== trimmedConfirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      setPasswordSaving(true);

      // simulate delay to show the loading button...
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch(
        "http://localhost:4000/api/settings/password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            currentPassword: trimmedCurrentPassword,
            newPassword: trimmedNewPassword,
          }),
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Une erreur est survenue");
      }

      const updatedSettings: Settings = await response.json();

      setSettings(updatedSettings);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordSuccess("Nouveau mot de passe enregistré avec succès !");
    } catch (err) {
      if (err instanceof Error) {
        setPasswordError(err.message);
      }
    } finally {
      setPasswordSaving(false);
    }
  }

  // useEffect(() => {SETUP}, [DEPENDENCIES?]);
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/settings", {
          // Need credentials include because backend auth uses cookies
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Utilisateur non authentifié");
        }

        const data: Settings = await response.json();
        setSettings(data);
      } catch (err) {
        if (err instanceof Error) {
          setPageError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (pageError) {
    return <p>{pageError}</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <Header showSearchBar={false} />
      <br />
      <br />
      <div className={styles.container}>
        <header>
          <p className={styles.breadcrumb}>Comptes / Paramètres</p>
          <h1 className={styles.pageTitle}>MES PARAMETRES</h1>
        </header>

        <section className={styles.settingsCard}>
          <h2>Bibliothèque Personnelle</h2>
          <div className={styles.row}>
            <div className={styles.labelCol}>
              <strong>Profil</strong>
              <p>Modifiez votre identifiant</p>
            </div>
            <div className={styles.inputCol}>
              <label className={styles.label}>Nouvel Identifiant</label>
              <div className={styles.inputGroup}>
                <input
                  className={styles.input}
                  type="text"
                  value={newUsername}
                  onChange={(e) => {
                    setNewUsername(e.target.value);
                    setFormError(null);
                    setSuccess(null);
                  }}
                  placeholder={settings?.username}
                />
                {formError && <p>{formError}</p>}
                {success && <p>{success}</p>}
                <button
                  className={styles.btnOrange}
                  onClick={handleUsernameUpdate}
                  disabled={saving}
                >
                  {saving ? "Enregistrement..." : "Valider"}
                </button>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.labelCol}>
              <strong>Thème</strong>
              <p>Personnalisez votre interface</p>
            </div>
            <div className={styles.inputCol}>
              <div className={styles.toggleGroup}>
                <button className={styles.toggleBtn}>Clair</button>
                <button className={`${styles.toggleBtn} ${styles.active}`}>
                  Sombre
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.settingsCard}>
          <h2>Sécurité et Confidentialité</h2>
          <div className={styles.row}>
            <div className={styles.labelCol}>
              <strong>Contact</strong>
              <p>Modifiez votre adresse e-mail</p>
            </div>
            <div className={styles.inputCol}>
              <label className={styles.label}>Nouvelle adresse e-mail</label>
              <input
                className={styles.input}
                type="email"
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                  setEmailError(null);
                  setEmailSuccess(null);
                }}
                placeholder={settings?.email}
              />
              <label className={styles.label}>
                Confirmez votre nouvelle adresse e-mail
              </label>
              <input
                className={styles.input}
                type="email"
                value={confirmEmail}
                onChange={(e) => {
                  setConfirmEmail(e.target.value);
                  setEmailError(null);
                  setEmailSuccess(null);
                }}
                placeholder={settings?.email}
              />
              {emailError && <p>{emailError}</p>}
              {emailSuccess && <p>{emailSuccess}</p>}
              <button
                className={`${styles.btnOrange} ${styles.rightAlign}`}
                onClick={handleEmailUpdate}
                disabled={emailSaving}
              >
                {emailSaving ? "Enregistrement..." : "Valider"}
              </button>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.labelCol}>
              <strong>Sécurité</strong>
              <p>Modifiez votre mot de passe</p>
            </div>
            <div className={styles.inputCol}>
              <label className={styles.label}>Mot de passe actuel</label>
              <input
                className={styles.input}
                type="password"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setPasswordError(null);
                  setPasswordSuccess(null);
                }}
                placeholder="********"
              />

              <label className={styles.label}>Nouveau mot de passe</label>
              <input
                className={styles.input}
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordError(null);
                  setPasswordSuccess(null);
                }}
                placeholder="********"
              />
              <label className={styles.label}>
                Confirmez votre nouveau mot de passe
              </label>
              <input
                className={styles.input}
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordError(null);
                  setPasswordSuccess(null);
                }}
                placeholder="********"
              />
              {passwordError && <p>{passwordError}</p>}
              {passwordSuccess && <p>{passwordSuccess}</p>}
              <button
                className={`${styles.btnOrange} ${styles.rightAlign}`}
                onClick={handlePasswordUpdate}
                disabled={passwordSaving}
              >
                {passwordSaving ? "Enregistrement..." : "Valider"}
              </button>
            </div>
          </div>
        </section>

        <section className={styles.settingsCard}>
          <h2>Gestion de compte</h2>
          <div className={styles.row}>
            <div className={styles.labelCol}>
              <strong>Paramètres du compte</strong>
              <p>Supprimez votre compte</p>
            </div>
            <div className={styles.inputCol}>
              <button className={styles.btnLargeOrange}>
                Supprimer définitivement
              </button>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.labelCol}>
              <p>Désactivez votre compte</p>
            </div>
            <div className={styles.inputCol}>
              <button className={styles.btnLargeOrange}>
                Désactiver temporairement
              </button>
            </div>
          </div>
        </section>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
}
