import React, { useState } from "react";
import api from "../api/axios";

function ForgotPasswordDialog({ open, onClose }) {
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);

	if (!open) return null;

	const submit = async (e) => {
		e.preventDefault();
		try {
			// Attempt to call backend endpoint if present
			await api.post("/auth/forgot-password", { email });
		} catch (e) {
			// ignore errors for demo
		}
		setSent(true);
	};

	return (
		<div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.4)" }}>
			<div style={{ width: 360, background: "white", padding: 20, borderRadius: 8 }}>
				<h3 style={{ marginTop: 0 }}>Reset password</h3>
				{sent ? (
					<div>
						<p>If an account exists we sent a reset link.</p>
						<button onClick={onClose} style={{ padding: "8px 12px" }}>Close</button>
					</div>
				) : (
					<form onSubmit={submit}>
						<input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 8 }} required />
						<div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
							<button type="button" onClick={onClose} style={{ padding: "8px 12px" }}>Cancel</button>
							<button type="submit" style={{ padding: "8px 12px", background: "#2d9b6d", color: "white", border: "none" }}>Send</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}

export default function Login({ onLogin } = {}) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const userType = "caregiver";
	const [showForgotPassword, setShowForgotPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		// detect admin email pattern
		const isAdminEmail = email.toLowerCase().includes("@carelink-admin.com") || email.toLowerCase().startsWith("admin@");

		try {
			setLoading(true);
			// call backend if available
			const res = await api.post("/auth/login", { email, password });
			const token = res?.data?.token;
			const user = res?.data?.user;
			if (token) localStorage.setItem("token", token);
			if (user) localStorage.setItem("user", JSON.stringify(user));

			const role = user?.role || (isAdminEmail ? "admin" : userType);
			(onLogin || (() => {}))(role);
		} catch (err) {
			console.error(err);
			setError(err?.response?.data?.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#e6f7f0 0%,#f8fdfb 100%)", padding: 16 }}>
			<div style={{ width: "100%", maxWidth: 420 }}>
				<div style={{ background: "white", borderRadius: 20, padding: 28, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
					<div style={{ textAlign: "center", marginBottom: 16 }}>
						<div style={{ display: "inline-flex", background: "linear-gradient(135deg,#2d9b6d,#4db88a)", padding: 16, borderRadius: 999 }}>
							<svg width="48" height="48" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 21s-7.333-4.873-9.333-7.667C-.333 9.333 3.36 4 8 4c2.667 0 4 2 4 2s1.333-2 4-2c4.64 0 8.333 5.333 5.333 9.333C19.333 16.127 12 21 12 21z" />
							</svg>
						</div>
						<h1 style={{ margin: "12px 0 4px", color: "#1a3a2e" }}>CareLink</h1>
						<p style={{ margin: 0, color: "#5f8074" }}>Caregiver-Assisted Senior Monitoring</p>
					</div>

					<form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
						<div>
							<label htmlFor="email" style={{ display: "block", marginBottom: 6 }}>Email Address</label>
							<input id="email" type="email" placeholder="caregiver@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", height: 48, borderRadius: 12, border: "1px solid #c7e5d8", padding: 10, background: "#f8fdfb" }} />
						</div>

						<div>
							<label htmlFor="password" style={{ display: "block", marginBottom: 6 }}>Password</label>
							<input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", height: 48, borderRadius: 12, border: "1px solid #c7e5d8", padding: 10, background: "#f8fdfb" }} />
						</div>

						<div style={{ textAlign: "right" }}>
							<button type="button" onClick={() => setShowForgotPassword(true)} style={{ background: "none", border: "none", color: "#2d9b6d", cursor: "pointer" }}>Forgot Password?</button>
						</div>

						{error && <div style={{ color: "#b00020" }}>{error}</div>}

						<button type="submit" disabled={loading} style={{ width: "100%", height: 48, background: "#2d9b6d", color: "white", border: "none", borderRadius: 12, cursor: loading ? "default" : "pointer" }}>{loading ? "Logging in..." : "Login"}</button>
					</form>
				</div>

				<p style={{ textAlign: "center", color: "#5f8074", marginTop: 16 }}>Caring for seniors with love and technology</p>
			</div>

			<ForgotPasswordDialog open={showForgotPassword} onClose={() => setShowForgotPassword(false)} />
		</div>
	);
}
