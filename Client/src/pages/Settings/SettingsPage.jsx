import { useEffect, useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Building2,
  Save,
  Check,
  Camera,
  Lock,
  Smartphone,
  Mail,
  CalendarDays,
  RotateCcw,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Monitor,
  AlertCircle,
} from "lucide-react";



const DEFAULT_SETTINGS = {
  profile: {
    name: "Binita Biswas",
    email: "binita@example.com",
    phone: "+91 98765 43210",
    role: "HR Manager",
  },

  notifications: {
    email: true,
    payroll: true,
    leave: true,
    birthday: false,
    attendance: true,
  },

  security: {
    twoFactor: true,
  },

  appearance: {
    theme: "light",
    accent: "violet",
  },

  company: {
    name: "CrewSync Technologies",
    industry: "Technology",
    email: "hr@crewsync.com",
    phone: "+91 98765 43210",
    address: "Gorakhpur, Uttar Pradesh",
  },
};

function applyTheme(theme) {
  const html = document.documentElement;

  // Previous theme remove karo
  html.classList.remove("dark");
  html.classList.remove("light");

  if (theme === "dark") {
    html.classList.add("dark");
  } else if (theme === "light") {
    html.classList.add("light");
  } else {
    // System theme
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    html.classList.toggle("dark", prefersDark);
    html.classList.toggle("light", !prefersDark);
  }
}
function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://i.pravatar.cc/150?img=5"
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const tabs = [
    {
      name: "Profile",
      icon: User,
      description: "Personal information",
    },
    {
      name: "Notifications",
      icon: Bell,
      description: "Notification preferences",
    },
    {
      name: "Security",
      icon: Shield,
      description: "Account security",
    },
    {
      name: "Appearance",
      icon: Palette,
      description: "Customize CrewSync",
    },
    {
      name: "Company",
      icon: Building2,
      description: "Company information",
    },
  ];

  useEffect(() => {
  const savedSettings = localStorage.getItem("crewsync-settings");
  const savedImage = localStorage.getItem("crewsync-profile-image");

  let loadedSettings = DEFAULT_SETTINGS;

  if (savedSettings) {
    try {
      const parsed = JSON.parse(savedSettings);

      loadedSettings = {
        ...DEFAULT_SETTINGS,
        ...parsed,
        profile: {
          ...DEFAULT_SETTINGS.profile,
          ...parsed.profile,
        },
        notifications: {
          ...DEFAULT_SETTINGS.notifications,
          ...parsed.notifications,
        },
        security: {
          ...DEFAULT_SETTINGS.security,
          ...parsed.security,
        },
        appearance: {
          ...DEFAULT_SETTINGS.appearance,
          ...parsed.appearance,
        },
        company: {
          ...DEFAULT_SETTINGS.company,
          ...parsed.company,
        },
      };
    } catch (error) {
      console.error("Settings load error:", error);
    }
  }

  setSettings(loadedSettings);

  if (savedImage) {
    setProfileImage(savedImage);
  }

  // Apply saved theme on page load
  applyTheme(loadedSettings.appearance.theme);
}, []);

  const updateProfile = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  const updateCompany = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        [field]: value,
      },
    }));
  };

  const updateNotification = (field) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: !prev.notifications[field],
      },
    }));
  };

 const updateTheme = (theme) => {
  setSettings((prev) => ({
    ...prev,
    appearance: {
      ...prev.appearance,
      theme,
    },
  }));

  applyTheme(theme);
};

  const updateAccent = (accent) => {
    setSettings((prev) => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        accent,
      },
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);
  };

  const handleSave = () => {
  localStorage.setItem(
    "crewsync-settings",
    JSON.stringify(settings)
  );

  localStorage.setItem(
    "crewsync-profile-image",
    profileImage
  );

  applyTheme(settings.appearance.theme);

  setSaved(true);

  setTimeout(() => {
    setSaved(false);
  }, 2500);
};

  const handleReset = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all settings?"
    );

    if (!confirmReset) return;

    setSettings(DEFAULT_SETTINGS);
    setProfileImage("https://i.pravatar.cc/150?img=5");

    localStorage.removeItem("crewsync-settings");
    localStorage.removeItem("crewsync-profile-image");
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill all password fields.");
      return;
    }

    if (newPassword.length < 6) {
      alert("New password must contain at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    alert("Password updated successfully.");
  };

  const themeIcon = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  };

  const ActiveThemeIcon =
    themeIcon[settings.appearance.theme] || Sun;

  return (
    <div className="min-h-full space-y-6 pb-10">

      {/* ================= HEADER ================= */}

      <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-8 text-white shadow-lg">

        <div className="absolute -right-16 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl transition-transform duration-1000 group-hover:scale-125" />

        <div className="absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-blue-300/10 blur-3xl transition-transform duration-1000 group-hover:scale-125" />

        <div className="relative">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
            <Shield size={14} />
            System Settings
          </div>

          <h1 className="text-3xl font-bold md:text-4xl">
            Settings ⚙️
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-violet-100 md:text-base">
            Manage your profile, notifications, security,
            appearance and company preferences from one place.
          </p>

        </div>
      </div>

      {/* ================= MAIN SETTINGS ================= */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[270px_1fr]">

        {/* ================= SETTINGS SIDEBAR ================= */}

        <div className="h-fit rounded-3xl bg-white p-4 shadow-sm">

          <div className="mb-4 px-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Settings Menu
            </p>
          </div>

          <div className="space-y-2">

            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.name;

              return (
                <button
                  key={tab.name}
                  type="button"
                  onClick={() => setActiveTab(tab.name)}
                  className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl p-3 text-left transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20"
                      : "text-slate-600 hover:-translate-y-0.5 hover:bg-violet-50 hover:text-violet-600"
                  }`}
                >

                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-white/15"
                        : "bg-slate-100 group-hover:scale-110 group-hover:bg-violet-100"
                    }`}
                  >
                    <Icon size={18} />
                  </span>

                  <span className="min-w-0 flex-1">

                    <span className="block text-sm font-semibold">
                      {tab.name}
                    </span>

                    <span
                      className={`block truncate text-[11px] ${
                        isActive
                          ? "text-violet-100"
                          : "text-slate-400"
                      }`}
                    >
                      {tab.description}
                    </span>

                  </span>

                </button>
              );
            })}

          </div>

          {/* Reset */}

          <button
            type="button"
            onClick={handleReset}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-500 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
          >
            <RotateCcw size={16} />
            Reset Settings
          </button>

        </div>

        {/* ================= CONTENT ================= */}

        <div className="min-w-0 rounded-3xl bg-white p-6 shadow-sm md:p-8">

          {/* ================= PROFILE ================= */}

          {activeTab === "Profile" && (
            <div className="animate-[fadeIn_0.3s_ease-out]">

              <SectionHeader
                icon={User}
                title="Profile Settings"
                description="Manage your personal information and profile details."
              />

              {/* Profile Card */}

              <div className="mb-8 flex flex-col gap-5 rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 p-5 sm:flex-row sm:items-center">

                <div className="relative w-fit">

                  <img
                    src={profileImage}
                    alt="Binita Biswas"
                    className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
                  />

                  <label className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition hover:scale-110 hover:bg-violet-700">

                    <Camera size={16} />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                  </label>

                </div>

                <div>

                  <h3 className="text-xl font-bold text-slate-800">
                    {settings.profile.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {settings.profile.role}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Click the camera icon to change your profile photo.
                  </p>

                </div>

              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <InputField
                  label="Full Name"
                  value={settings.profile.name}
                  onChange={(e) =>
                    updateProfile("name", e.target.value)
                  }
                />

                <InputField
                  label="Email Address"
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) =>
                    updateProfile("email", e.target.value)
                  }
                />

                <InputField
                  label="Phone Number"
                  value={settings.profile.phone}
                  onChange={(e) =>
                    updateProfile("phone", e.target.value)
                  }
                />

                <InputField
                  label="Role"
                  value={settings.profile.role}
                  disabled
                />

              </div>

            </div>
          )}

          {/* ================= NOTIFICATIONS ================= */}

          {activeTab === "Notifications" && (
            <div className="animate-[fadeIn_0.3s_ease-out]">

              <SectionHeader
                icon={Bell}
                title="Notifications"
                description="Choose which notifications you want to receive."
              />

              <div className="divide-y divide-slate-100">

                <NotificationItem
                  icon={Mail}
                  title="Email Notifications"
                  description="Receive important CrewSync updates through email."
                  enabled={settings.notifications.email}
                  onChange={() => updateNotification("email")}
                />

                <NotificationItem
                  icon={WalletIcon}
                  title="Payroll Alerts"
                  description="Get notified when payroll needs your attention."
                  enabled={settings.notifications.payroll}
                  onChange={() => updateNotification("payroll")}
                />

                <NotificationItem
                  icon={CalendarDays}
                  title="Leave Requests"
                  description="Receive notifications for new employee leave requests."
                  enabled={settings.notifications.leave}
                  onChange={() => updateNotification("leave")}
                />

                <NotificationItem
                  icon={Bell}
                  title="Birthday Reminders"
                  description="Get reminders about employee birthdays."
                  enabled={settings.notifications.birthday}
                  onChange={() => updateNotification("birthday")}
                />

                <NotificationItem
                  icon={CalendarDays}
                  title="Attendance Alerts"
                  description="Receive alerts for attendance irregularities."
                  enabled={settings.notifications.attendance}
                  onChange={() => updateNotification("attendance")}
                />

              </div>

            </div>
          )}

          {/* ================= SECURITY ================= */}

          {activeTab === "Security" && (
            <div className="animate-[fadeIn_0.3s_ease-out]">

              <SectionHeader
                icon={Shield}
                title="Security"
                description="Protect your CrewSync account and manage security preferences."
              />

              {/* Password */}

              <div className="rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:border-violet-200 hover:shadow-md">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <Lock size={19} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">
                      Change Password
                    </h3>

                    <p className="text-xs text-slate-500">
                      Update your password to keep your account secure.
                    </p>
                  </div>

                </div>

                <div className="space-y-4">

                  <PasswordField
                    label="Current Password"
                    value={currentPassword}
                    onChange={setCurrentPassword}
                    show={showCurrentPassword}
                    onToggle={() =>
                      setShowCurrentPassword(!showCurrentPassword)
                    }
                  />

                  <PasswordField
                    label="New Password"
                    value={newPassword}
                    onChange={setNewPassword}
                    show={showNewPassword}
                    onToggle={() =>
                      setShowNewPassword(!showNewPassword)
                    }
                  />

                  <PasswordField
                    label="Confirm New Password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    show={showConfirmPassword}
                    onToggle={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  />

                </div>

                <button
                  type="button"
                  onClick={handlePasswordChange}
                  className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-lg active:scale-95"
                >
                  Update Password
                </button>

              </div>

              {/* 2FA */}

              <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Smartphone size={19} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">
                      Two-Factor Authentication
                    </h3>

                    <p className="text-xs text-slate-500">
                      Add another layer of security to your account.
                    </p>
                  </div>

                </div>

                <Toggle
                  enabled={settings.security.twoFactor}
                  onChange={() =>
                    setSettings((prev) => ({
                      ...prev,
                      security: {
                        ...prev.security,
                        twoFactor: !prev.security.twoFactor,
                      },
                    }))
                  }
                />

              </div>

              {/* Login Activity */}

              <div className="mt-5 rounded-2xl bg-slate-50 p-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                    <Shield size={18} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">
                      Account Protection
                    </h3>

                    <p className="text-xs text-slate-500">
                      Your account is protected with modern security controls.
                    </p>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ================= APPEARANCE ================= */}

          {activeTab === "Appearance" && (
            <div className="animate-[fadeIn_0.3s_ease-out]">

              <SectionHeader
                icon={Palette}
                title="Appearance"
                description="Customize the visual experience of your CrewSync dashboard."
              />

              {/* Theme */}

              <div className="mb-8">

                <h3 className="mb-4 font-bold text-slate-800">
                  Theme
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                  <ThemeCard
                    icon={Sun}
                    title="Light"
                    description="Clean and bright interface."
                    active={settings.appearance.theme === "light"}
                    onClick={() => updateTheme("light")}
                    light
                  />

                  <ThemeCard
                    icon={Moon}
                    title="Dark"
                    description="Comfortable for low-light environments."
                    active={settings.appearance.theme === "dark"}
                    onClick={() => updateTheme("dark")}
                    dark
                  />

                  <ThemeCard
                    icon={Monitor}
                    title="System"
                    description="Follow your device preference."
                    active={settings.appearance.theme === "system"}
                    onClick={() => updateTheme("system")}
                  />

                </div>

              </div>

              {/* Accent */}

              <div>

                <h3 className="mb-4 font-bold text-slate-800">
                  Accent Color
                </h3>

                <div className="flex flex-wrap gap-4">

                  <AccentButton
                    name="violet"
                    color="bg-violet-600"
                    active={settings.appearance.accent === "violet"}
                    onClick={() => updateAccent("violet")}
                  />

                  <AccentButton
                    name="blue"
                    color="bg-blue-600"
                    active={settings.appearance.accent === "blue"}
                    onClick={() => updateAccent("blue")}
                  />

                  <AccentButton
                    name="emerald"
                    color="bg-emerald-600"
                    active={settings.appearance.accent === "emerald"}
                    onClick={() => updateAccent("emerald")}
                  />

                  <AccentButton
                    name="rose"
                    color="bg-rose-600"
                    active={settings.appearance.accent === "rose"}
                    onClick={() => updateAccent("rose")}
                  />

                </div>

              </div>

              <div className="mt-8 flex items-center gap-3 rounded-2xl bg-violet-50 p-4 text-violet-700">

                <ActiveThemeIcon size={20} />

                <p className="text-sm font-semibold">
                  Current theme:{" "}
                  {settings.appearance.theme.charAt(0).toUpperCase() +
                    settings.appearance.theme.slice(1)}
                </p>

              </div>

            </div>
          )}

          {/* ================= COMPANY ================= */}

          {activeTab === "Company" && (
            <div className="animate-[fadeIn_0.3s_ease-out]">

              <SectionHeader
                icon={Building2}
                title="Company Settings"
                description="Manage your organization's information."
              />

              <div className="mb-7 rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 p-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg">
                    <Building2 size={25} />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {settings.company.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {settings.company.industry}
                    </p>
                  </div>

                </div>

              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <InputField
                  label="Company Name"
                  value={settings.company.name}
                  onChange={(e) =>
                    updateCompany("name", e.target.value)
                  }
                />

                <InputField
                  label="Industry"
                  value={settings.company.industry}
                  onChange={(e) =>
                    updateCompany("industry", e.target.value)
                  }
                />

                <InputField
                  label="Company Email"
                  type="email"
                  value={settings.company.email}
                  onChange={(e) =>
                    updateCompany("email", e.target.value)
                  }
                />

                <InputField
                  label="Company Phone"
                  value={settings.company.phone}
                  onChange={(e) =>
                    updateCompany("phone", e.target.value)
                  }
                />

                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Company Address
                  </label>

                  <textarea
                    rows="3"
                    value={settings.company.address}
                    onChange={(e) =>
                      updateCompany("address", e.target.value)
                    }
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  />

                </div>

              </div>

            </div>
          )}

          {/* ================= SAVE ================= */}

          <div className="mt-10 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-2 text-xs text-slate-400">

              <AlertCircle size={15} />

              Changes are saved locally in your browser.

            </div>

            <button
              type="button"
              onClick={handleSave}
              className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl active:scale-95"
            >

              {saved ? (
                <>
                  <Check size={18} />
                  Saved Successfully
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}

            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="mb-8 flex items-start gap-4">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
        <Icon size={22} />
      </div>

      <div>

        <h2 className="text-2xl font-bold text-slate-800">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
}

function InputField({
  label,
  type = "text",
  value,
  onChange,
  disabled = false,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition ${
          disabled
            ? "cursor-not-allowed bg-slate-50 text-slate-400"
            : "focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
        }`}
      />

    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  show,
  onToggle,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">

        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-violet-600"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

      </div>

    </div>
  );
}

function NotificationItem({
  icon: Icon,
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-5">

      <div className="flex min-w-0 items-center gap-4">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all duration-300 hover:scale-110 hover:bg-violet-100 hover:text-violet-600">
          <Icon size={18} />
        </div>

        <div>

          <h3 className="font-semibold text-slate-800">
            {title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>

        </div>

      </div>

      <Toggle enabled={enabled} onChange={onChange} />

    </div>
  );
}

function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={enabled}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-all duration-300 ${
        enabled ? "bg-violet-600" : "bg-slate-300"
      }`}
    >

      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />

    </button>
  );
}

function ThemeCard({
  icon: Icon,
  title,
  description,
  active,
  onClick,
  light,
  dark,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group rounded-2xl border-2 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        active
          ? "border-violet-500 shadow-lg shadow-violet-500/10"
          : "border-slate-200"
      } ${dark ? "bg-slate-900" : "bg-white"}`}
    >

      <div
        className={`mb-4 flex h-24 items-center justify-center rounded-xl ${
          light
            ? "bg-slate-100"
            : dark
            ? "bg-slate-800"
            : "bg-slate-100"
        }`}
      >

        <Icon
          size={30}
          className={
            dark
              ? "text-violet-400"
              : "text-violet-600"
          }
        />

      </div>

      <h3
        className={`font-bold ${
          dark ? "text-white" : "text-slate-800"
        }`}
      >
        {title}
      </h3>

      <p
        className={`mt-1 text-xs ${
          dark ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {description}
      </p>

      {active && (
        <div className="mt-3 flex items-center gap-1 text-xs font-bold text-violet-500">
          <Check size={14} />
          Selected
        </div>
      )}

    </button>
  );
}

function AccentButton({
  name,
  color,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      aria-label={`Select ${name} accent`}
      onClick={onClick}
      className={`flex h-12 w-12 items-center justify-center rounded-full border-4 transition-all duration-300 hover:scale-110 ${
        active
          ? "border-slate-300 shadow-lg"
          : "border-transparent"
      }`}
    >
      <span className={`h-8 w-8 rounded-full ${color}`} />
    </button>
  );
}

function WalletIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 7V6a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v8a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V7" />
      <path d="M16 14h.01" />
    </svg>
  );
}

export default SettingsPage;