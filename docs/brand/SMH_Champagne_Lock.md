

# St Mary’s House Dental – Champagne Design Lock (v5.0)

**Core tokens**

Token	Value	Purpose
--smh-primary-magenta	#C2185B	Hero start, gradient base
--smh-primary-teal	#40C4B4	Hero end, accent hover
--smh-accent-gold	#D4AF37	Icons, dividers, keylines
--smh-gradient	linear-gradient(135deg,#D94BC6 0%,#00C2C7 100%)	Universal background
--smh-bg	#FFFFFF (light) / #0A0A0A (dark)	Neutral surfaces
--smh-text	#1A1A1A (light) / #FFFFFF (dark)	Primary text
--glass-bg-strong	color-mix(in srgb,var(--smh-bg) 40%, transparent 60%)	Pane background
--glass-border	color-mix(in srgb,var(--smh-text) 14%, transparent 86%)	Pane rim
--rim-gold-inset	inset 0 0 0 1px color-mix(in srgb, var(--smh-accent-gold) 60%, transparent 40%)	Accent outline

Fonts:
Playfair Display (headlines) · Inter (UI/body)

Visual layers (hero):
gradient → wave mask → flecks (gold, blur=8px, opacity≈0.08) → film grain (≈6%) → content

CI protection:
pnpm run brand:guard
Blocks merges if --glass-bg-strong exceeds 60 % base colour or if any hard-coded brand hex is detected outside /styles/tokens.css.
