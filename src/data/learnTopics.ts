export interface LearnTopic {
  id: string;
  title: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  explanation: string;
  howItWorks: string[];
  typesOrVariants: { name: string; desc: string }[];
  realLifeExamples: { title: string; story: string }[];
  warningSignals: string[];
  prevention: string[];
  dos: string[];
  donts: string[];
  stats: { value: string; label: string }[];
  quiz: { question: string; options: string[]; answer: number }[];
}

export const learnTopics: LearnTopic[] = [
  {
    id: "phishing",
    title: "Phishing Attacks",
    icon: "Fish",
    difficulty: "Beginner",
    duration: "12 min",
    explanation: "Phishing is a social engineering cyber attack where criminals send deceptive messages — usually via email, SMS, or social media — designed to trick you into revealing sensitive information such as passwords, credit card numbers, or personal data. These messages impersonate trusted entities like banks, government agencies, or popular services. Phishing is the #1 attack vector used by cybercriminals worldwide and accounts for over 80% of reported security incidents.",
    howItWorks: [
      "The attacker crafts a convincing message that appears to come from a legitimate source (e.g., your bank, Google, Amazon).",
      "The message creates urgency — 'Your account will be locked!', 'Unauthorized transaction detected!' — to bypass your critical thinking.",
      "A malicious link redirects you to a fake website that looks identical to the real one.",
      "You unknowingly enter your credentials on the fake site, which sends them directly to the attacker.",
      "The attacker now has access to your real account and can steal money, data, or identity."
    ],
    typesOrVariants: [
      { name: "Spear Phishing", desc: "Targeted attacks on specific individuals using personalized information gathered from social media or data breaches." },
      { name: "Whaling", desc: "Phishing attacks specifically targeting high-level executives (CEOs, CFOs) for large financial gain." },
      { name: "Smishing (SMS Phishing)", desc: "Phishing via text messages, often impersonating delivery services like FedEx or banks." },
      { name: "Vishing (Voice Phishing)", desc: "Phone call scams where attackers pretend to be bank officials, tech support, or government agents." },
      { name: "Clone Phishing", desc: "Attackers duplicate a legitimate email you previously received, replacing the attachment or link with a malicious one." },
      { name: "Angler Phishing", desc: "Fake customer support accounts on social media that trick users into revealing account credentials." }
    ],
    realLifeExamples: [
      { title: "The Google Docs Attack (2017)", story: "Millions of Gmail users received emails from known contacts with a Google Docs sharing invite. Clicking 'Open in Docs' granted attackers full access to victims' Gmail accounts and contact lists, spreading the attack virally." },
      { title: "COVID-19 Vaccine Registration Scam", story: "Scammers sent official-looking emails claiming to be from health departments, asking people to 'register for vaccination' through a fake portal that collected personal data including Aadhaar numbers and bank details." },
      { title: "The KYC Update Fraud (India)", story: "Victims receive SMS messages saying 'Your bank account will be blocked. Complete KYC immediately.' The link leads to a fake banking portal where entering credentials gives attackers full account access." }
    ],
    warningSignals: [
      "Sender email doesn't match the official domain (e.g., support@paypa1.com instead of support@paypal.com)",
      "Generic greeting like 'Dear Customer' instead of using your actual name",
      "Urgent language: 'Act immediately!', 'Your account will be suspended!'",
      "Suspicious attachments (.exe, .zip, or unexpected .pdf files)",
      "URLs that look wrong when you hover over them",
      "Poor grammar and spelling mistakes in official-looking emails",
      "Requests for sensitive information (passwords, OTPs, PINs)"
    ],
    prevention: [
      "Always verify the sender's email address — look for subtle misspellings.",
      "Never click links in unexpected emails; go directly to the official website by typing the URL.",
      "Enable Multi-Factor Authentication (MFA) on all important accounts.",
      "Use email filters and anti-phishing browser extensions.",
      "Report phishing emails to your email provider (Gmail: click '⋮' → 'Report phishing').",
      "Keep your browser and antivirus software updated to block known phishing sites."
    ],
    dos: [
      "Hover over links before clicking to preview the actual URL",
      "Verify urgent requests by contacting the company through their official website/phone",
      "Enable spam filters in your email settings",
      "Report suspicious emails to your IT department or email provider",
      "Use a password manager — it won't auto-fill on fake websites"
    ],
    donts: [
      "Never click links or download attachments from unknown senders",
      "Don't enter credentials on sites reached via email links",
      "Don't trust caller ID — it can be spoofed",
      "Never share OTPs with anyone, even if they claim to be from your bank",
      "Don't reply to suspicious emails — even to 'unsubscribe'"
    ],
    stats: [
      { value: "3.4B", label: "phishing emails sent daily worldwide" },
      { value: "83%", label: "of organizations experienced phishing in 2023" },
      { value: "$4.91M", label: "average cost of a phishing data breach" }
    ],
    quiz: [
      { question: "What is spear phishing?", options: ["Random mass emails", "Targeted attacks using personal info", "Phone-based scams", "Social media hacking"], answer: 1 },
      { question: "Which is the safest action when you get an 'account suspended' email?", options: ["Click the link and log in", "Reply asking for details", "Go to the official website directly", "Forward it to friends"], answer: 2 },
      { question: "What should you check first in a suspicious email?", options: ["The color scheme", "The sender's email address", "The font size", "The email signature"], answer: 1 }
    ]
  },
  {
    id: "malware",
    title: "Malware & Viruses",
    icon: "Bug",
    difficulty: "Beginner",
    duration: "15 min",
    explanation: "Malware (short for malicious software) is any program or code designed to harm, exploit, or otherwise compromise a computer, network, or user. Malware can steal your data, encrypt your files for ransom, spy on your activities, use your computer to attack others, or simply destroy your system. It is one of the oldest and most persistent cyber threats, evolving constantly to evade detection. From the first computer virus in 1986 to today's AI-powered polymorphic malware, understanding these threats is fundamental to digital safety.",
    howItWorks: [
      "Malware enters your system through various vectors: infected email attachments, malicious downloads, compromised websites, or infected USB drives.",
      "Once inside, it executes its payload — this could be stealing data, encrypting files, logging keystrokes, or creating backdoors.",
      "Advanced malware can evade antivirus detection by changing its code signature (polymorphic malware) or hiding in legitimate processes.",
      "Some malware spreads autonomously across networks (worms), while others require user action to activate (trojans).",
      "Modern malware often communicates with Command & Control (C2) servers to receive instructions and exfiltrate stolen data."
    ],
    typesOrVariants: [
      { name: "Virus", desc: "Self-replicating code that attaches to legitimate programs and spreads when the host program runs. Like biological viruses, they need a host to propagate." },
      { name: "Trojan Horse", desc: "Disguised as legitimate software (a game, utility, or update), but secretly performs malicious actions like creating backdoors or stealing data." },
      { name: "Worm", desc: "Self-replicating malware that spreads independently across networks without needing a host program. Can bring entire networks down." },
      { name: "Spyware", desc: "Secretly monitors your activities — tracking browsing habits, capturing screenshots, logging keystrokes, and recording through your webcam/microphone." },
      { name: "Adware", desc: "Floods your device with unwanted advertisements, often bundled with free software. Some variants also track your browsing behavior." },
      { name: "Rootkit", desc: "Hides deep within your operating system, giving attackers persistent, undetectable administrator-level access to your machine." },
      { name: "Keylogger", desc: "Records every keystroke you make, capturing passwords, credit card numbers, messages, and other sensitive data." },
      { name: "Fileless Malware", desc: "Operates entirely in memory without writing files to disk, making it extremely difficult for traditional antivirus to detect." }
    ],
    realLifeExamples: [
      { title: "WannaCry Ransomware (2017)", story: "WannaCry infected over 230,000 computers across 150 countries in a single day. It exploited a Windows vulnerability called EternalBlue, encrypting files and demanding $300 in Bitcoin. Hospitals in the UK's NHS had to cancel surgeries and turn away patients." },
      { title: "Pegasus Spyware (2021)", story: "NSO Group's Pegasus spyware was found on phones of journalists, activists, and politicians worldwide. It could activate cameras, microphones, read messages, and track location — all without the user's knowledge, using zero-click exploits." },
      { title: "ILOVEYOU Virus (2000)", story: "A simple email with subject 'ILOVEYOU' and an attachment 'LOVE-LETTER-FOR-YOU.txt.vbs' infected over 10 million Windows PCs worldwide. It overwrote files, stole passwords, and caused an estimated $10 billion in damages." }
    ],
    warningSignals: [
      "Computer suddenly runs much slower than usual",
      "Unexpected pop-ups, ads, or browser redirects",
      "Programs crashing or behaving erratically",
      "Unknown programs appearing in your installed apps list",
      "Hard drive activity when you're not doing anything",
      "Your antivirus is mysteriously disabled",
      "Files are missing, modified, or encrypted without your action",
      "Unusual network traffic or data usage spikes"
    ],
    prevention: [
      "Install and maintain reputable antivirus/anti-malware software (Windows Defender, Malwarebytes, Kaspersky).",
      "Keep your OS, browser, and all applications updated — patches fix security vulnerabilities.",
      "Only download software from official sources (Microsoft Store, Apple App Store, developer websites).",
      "Never open email attachments from unknown or unexpected senders.",
      "Use a firewall to monitor incoming and outgoing network traffic.",
      "Scan USB drives before opening files from them.",
      "Create regular backups so you can recover if malware strikes."
    ],
    dos: [
      "Run full system scans regularly (weekly minimum)",
      "Keep automatic updates enabled on all devices",
      "Use browser extensions that block malicious websites (uBlock Origin, HTTPS Everywhere)",
      "Disconnect from the internet immediately if you suspect infection",
      "Back up important data to an external drive or cloud service"
    ],
    donts: [
      "Never download cracked or pirated software — it's the #1 malware delivery method",
      "Don't disable your antivirus 'temporarily' for any download",
      "Avoid clicking on pop-up ads or 'Your computer is infected!' warnings",
      "Don't use outdated operating systems (Windows 7, XP) — they no longer receive security patches",
      "Never plug in USB drives you found lying around"
    ],
    stats: [
      { value: "560K", label: "new malware samples detected daily" },
      { value: "$4.35M", label: "average cost of a malware attack to businesses" },
      { value: "92%", label: "of malware is delivered via email" }
    ],
    quiz: [
      { question: "What is a Trojan Horse in cybersecurity?", options: ["A firewall bypass tool", "Malware disguised as legitimate software", "A type of VPN", "An encryption algorithm"], answer: 1 },
      { question: "How does a worm differ from a virus?", options: ["Worms need a host program", "Worms can spread without user action", "Viruses are more dangerous", "There is no difference"], answer: 1 },
      { question: "What should you do first if you suspect malware infection?", options: ["Delete all files", "Disconnect from the internet", "Restart the computer", "Ignore it"], answer: 1 }
    ]
  },
  {
    id: "ransomware",
    title: "Ransomware",
    icon: "Lock",
    difficulty: "Intermediate",
    duration: "14 min",
    explanation: "Ransomware is a devastating type of malware that encrypts your files — documents, photos, databases, everything — making them completely inaccessible. The attacker then demands a ransom payment (usually in cryptocurrency like Bitcoin) in exchange for the decryption key. It is one of the fastest-growing and most profitable cyber crimes, targeting individuals, hospitals, schools, governments, and corporations alike. Even if you pay, there's no guarantee you'll get your data back — many victims who pay never receive a working decryption key.",
    howItWorks: [
      "The ransomware enters your system through a phishing email, malicious download, exploit kit, or compromised remote desktop (RDP).",
      "It silently scans your system and connected network drives, identifying valuable files (documents, databases, images, backups).",
      "Using military-grade encryption (AES-256 or RSA-2048), it encrypts all identified files, appending extensions like '.locked' or '.encrypted'.",
      "A ransom note appears on your screen demanding payment in Bitcoin within a deadline (often 48-72 hours).",
      "Many modern variants also exfiltrate (steal) your data before encrypting, threatening to publish it if you don't pay (double extortion).",
      "Some ransomware spreads laterally across networks, encrypting every connected computer and server."
    ],
    typesOrVariants: [
      { name: "Crypto Ransomware", desc: "Encrypts your files with strong cryptography. The most common and dangerous type. Examples: WannaCry, Ryuk, LockBit." },
      { name: "Locker Ransomware", desc: "Locks you out of your entire device (locks the screen) without encrypting individual files. Easier to recover from." },
      { name: "Double Extortion", desc: "Steals your data AND encrypts it. Threatens to publish sensitive data online if ransom isn't paid. Examples: Maze, REvil." },
      { name: "Triple Extortion", desc: "Adds DDoS attacks on top of encryption and data theft to pressure victims into paying faster." },
      { name: "Ransomware-as-a-Service (RaaS)", desc: "Criminal groups sell or lease ransomware tools to other criminals, who carry out attacks and share profits. Lowered the barrier to entry dramatically." }
    ],
    realLifeExamples: [
      { title: "Colonial Pipeline (2021)", story: "The DarkSide ransomware gang attacked Colonial Pipeline, which supplies 45% of fuel to the US East Coast. The attack caused fuel shortages, panic buying, and gas station closures across multiple states. The company paid $4.4 million in Bitcoin ransom." },
      { title: "AIIMS Delhi (2022)", story: "India's premier hospital AIIMS Delhi was hit by ransomware, crippling patient services for over two weeks. Registration, billing, lab reports, and smart lab functions all went offline, forcing staff to use pen and paper. Over 40 million patient records were compromised." },
      { title: "Costa Rica Government (2022)", story: "The Conti ransomware group attacked Costa Rica's government systems so severely that the country declared a national emergency — the first ever caused by a cyber attack. Tax systems, customs, and social services were all taken offline." }
    ],
    warningSignals: [
      "Files suddenly have strange new extensions (.encrypted, .locked, .crypted)",
      "You cannot open any of your documents, photos, or files",
      "A threatening message appears demanding payment in cryptocurrency",
      "Your desktop wallpaper is replaced with a ransom note",
      "System processes running at 100% for extended periods (encryption in progress)",
      "Connected backup drives are also encrypted or inaccessible"
    ],
    prevention: [
      "Maintain the 3-2-1 backup rule: 3 copies, 2 different media, 1 offsite/offline backup.",
      "Never pay the ransom — it funds criminal operations and doesn't guarantee recovery.",
      "Keep all software and operating systems patched and updated.",
      "Disable Remote Desktop Protocol (RDP) if not needed, or secure it with VPN + MFA.",
      "Use email filtering to block malicious attachments (.exe, .js, .vbs files).",
      "Segment your network so ransomware can't spread to all systems.",
      "Train all employees to recognize phishing emails — the #1 ransomware entry point."
    ],
    dos: [
      "Test your backups regularly — make sure you can actually restore from them",
      "Have an incident response plan ready before an attack happens",
      "Report ransomware attacks to law enforcement (cybercrime.gov.in in India, FBI's IC3 in the US)",
      "Isolate infected machines immediately to prevent lateral spread",
      "Keep offline backups — ransomware specifically targets connected backup drives"
    ],
    donts: [
      "Never pay the ransom — you're funding criminals with no guarantee of recovery",
      "Don't try to 'fix' encrypted files yourself — you may destroy the encryption keys",
      "Don't connect backup drives to an infected system",
      "Don't ignore software update notifications — they patch the vulnerabilities ransomware exploits",
      "Don't use weak or default RDP credentials"
    ],
    stats: [
      { value: "$1.85M", label: "average recovery cost from a ransomware attack" },
      { value: "11 sec", label: "frequency of ransomware attacks (one every 11 seconds)" },
      { value: "80%", label: "of victims who pay the ransom get attacked again" }
    ],
    quiz: [
      { question: "What is 'double extortion' ransomware?", options: ["Charging twice the ransom", "Encrypting AND stealing data, threatening to publish it", "Attacking two companies at once", "Using two types of encryption"], answer: 1 },
      { question: "What is the 3-2-1 backup rule?", options: ["3 passwords, 2 emails, 1 phone", "3 copies, 2 different media, 1 offsite", "3 firewalls, 2 antiviruses, 1 VPN", "3 admins, 2 users, 1 guest"], answer: 1 },
      { question: "Should you pay the ransom?", options: ["Yes, to get files back", "Yes, if the amount is small", "No, it funds crime and doesn't guarantee recovery", "Only in cryptocurrency"], answer: 2 }
    ]
  },
  {
    id: "social-engineering",
    title: "Social Engineering",
    icon: "Users",
    difficulty: "Intermediate",
    duration: "13 min",
    explanation: "Social engineering is the art of psychologically manipulating people into making security mistakes or giving away confidential information. Unlike traditional hacking that exploits software vulnerabilities, social engineering exploits human psychology — our trust, helpfulness, fear, and curiosity. It is often called 'hacking the human' because even the most secure systems can be bypassed by tricking the people who use them. Over 98% of cyber attacks rely on some form of social engineering.",
    howItWorks: [
      "Research: The attacker gathers information about the target from social media, company websites, and public records.",
      "Pretexting: They create a believable scenario — pretending to be a colleague, IT support, delivery person, or authority figure.",
      "Engagement: They approach the target through email, phone, in-person, or social media with their crafted story.",
      "Exploitation: They use psychological triggers (urgency, authority, reciprocity, fear) to get the victim to act.",
      "Execution: The victim unknowingly shares credentials, clicks a link, opens a door, or transfers money."
    ],
    typesOrVariants: [
      { name: "Pretexting", desc: "Creating a fabricated scenario to engage the victim. Example: 'I'm from the bank's fraud department, and we've detected suspicious activity on your account.'" },
      { name: "Baiting", desc: "Offering something enticing (free software, USB drive, prize) to lure victims. The 'bait' contains malware or leads to credential theft." },
      { name: "Tailgating / Piggybacking", desc: "Physically following an authorized person through a secure door. 'Can you hold the door? My hands are full!' " },
      { name: "Quid Pro Quo", desc: "Offering a service in exchange for information. 'I'm from IT, I can fix your slow computer if you give me your login.' " },
      { name: "Honey Trap", desc: "Using romantic or attractive profiles to build a relationship, then extracting money or information from the victim." },
      { name: "Watering Hole Attack", desc: "Compromising a website frequently visited by the target group, infecting visitors with malware." },
      { name: "Business Email Compromise (BEC)", desc: "Impersonating a CEO or senior executive via email to authorize fraudulent wire transfers. Caused $2.7B in losses in 2022." }
    ],
    realLifeExamples: [
      { title: "Twitter Bitcoin Scam (2020)", story: "Attackers socially engineered Twitter employees via phone, gaining access to internal tools. They hijacked accounts of Barack Obama, Elon Musk, Bill Gates, and Apple, posting Bitcoin scam messages. Over $120,000 was stolen in hours." },
      { title: "The Fake CEO Wire Transfer", story: "An employee at a European company received an urgent email from the 'CEO' requesting an immediate wire transfer of €243,000 to a new supplier. The employee complied. The email was from an attacker who had studied the CEO's writing style and travel schedule." },
      { title: "Kevin Mitnick's Exploits", story: "Legendary hacker Kevin Mitnick broke into some of the most secure systems in the world using primarily social engineering. He would call companies pretending to be a fellow employee and convince IT staff to reset passwords or share system access." }
    ],
    warningSignals: [
      "Someone creates a false sense of urgency ('Do this NOW or your account will be deleted!')",
      "Unsolicited contact claiming to be from authority (bank, government, police, IT department)",
      "Requests that bypass normal procedures ('Don't tell anyone about this transfer')",
      "Emotional manipulation — flattery, sympathy, fear, or romantic interest",
      "Too-good-to-be-true offers or unexpected prizes",
      "Pressure to make decisions quickly without verification",
      "Someone asking you to share your screen or install remote access software"
    ],
    prevention: [
      "Always verify identities through official channels — call back on published numbers.",
      "Establish verification protocols for financial transactions (dual approval, callback verification).",
      "Be cautious about what you share on social media — attackers mine it for pretexting.",
      "Implement security awareness training for all employees, updated quarterly.",
      "Use code words or out-of-band verification for sensitive requests.",
      "Trust your instincts — if something feels 'off', it probably is."
    ],
    dos: [
      "Slow down and think before acting on any urgent request",
      "Verify unexpected requests through a separate communication channel",
      "Question why someone needs the information they're requesting",
      "Report suspicious contacts to your security team immediately",
      "Educate family members, especially children and elderly, about these tactics"
    ],
    donts: [
      "Don't let anyone pressure you into bypassing security procedures",
      "Never share login credentials, even with someone claiming to be IT support",
      "Don't hold doors open for strangers in secure areas without badge verification",
      "Never install software at the request of an unsolicited caller",
      "Don't overshare personal information on social media"
    ],
    stats: [
      { value: "98%", label: "of cyber attacks involve social engineering" },
      { value: "$2.7B", label: "lost to Business Email Compromise in 2022" },
      { value: "82%", label: "of data breaches involve the human element" }
    ],
    quiz: [
      { question: "What is 'pretexting'?", options: ["Installing a virus", "Creating a fake scenario to manipulate someone", "Sending spam emails", "Using a VPN"], answer: 1 },
      { question: "An unknown IT person calls asking for your password to 'fix an issue'. What do you do?", options: ["Give the password since they're IT", "Hang up and call the IT department directly using the official number", "Ask them to email you instead", "Share it if they know your employee ID"], answer: 1 }
    ]
  },
  {
    id: "password-security",
    title: "Password Security",
    icon: "Key",
    difficulty: "Beginner",
    duration: "10 min",
    explanation: "Your passwords are the keys to your digital life — email, banking, social media, and everything else. Yet studies show that 65% of people reuse the same password across multiple accounts, and the most common password is still '123456'. A single compromised password can lead to a catastrophic domino effect where attackers gain access to every account you own. Understanding password security is the single most impactful step you can take to protect yourself online.",
    howItWorks: [
      "Attackers use automated tools that try millions of password combinations per second (brute force attacks).",
      "Dictionary attacks try common words, names, and variations (P@ssw0rd, Summer2024!, etc.).",
      "Credential stuffing uses passwords leaked from data breaches to log into other sites, exploiting password reuse.",
      "Rainbow table attacks use pre-computed hash tables to reverse-engineer passwords from stolen databases.",
      "Social engineering extracts password hints from your social media (pet names, birthdays, favorite teams)."
    ],
    typesOrVariants: [
      { name: "Brute Force Attack", desc: "Systematically trying every possible combination. A 6-character password can be cracked in under 1 second; a 16-character one could take millions of years." },
      { name: "Dictionary Attack", desc: "Using lists of common passwords, words, and predictable patterns. 'Summer2024!' and 'P@ssw0rd' are cracked in milliseconds." },
      { name: "Credential Stuffing", desc: "Using leaked username-password pairs from one breach to access accounts on other platforms. Works because 65% of people reuse passwords." },
      { name: "Keylogging", desc: "Malware that silently records every keystroke, capturing your passwords as you type them." },
      { name: "Shoulder Surfing", desc: "Physically watching someone type their password. Common in public places like cafés and airports." }
    ],
    realLifeExamples: [
      { title: "RockYou Data Breach (2009)", story: "32 million passwords were stolen and leaked in plain text. Analysis revealed the most common passwords: '123456', '12345', 'password', 'iloveyou'. This breach created the infamous 'RockYou wordlist' still used by hackers today." },
      { title: "LinkedIn Breach (2012/2016)", story: "117 million email-password combinations were stolen from LinkedIn. Because many users reused these passwords on other sites, attackers used credential stuffing to break into their email, banking, and social media accounts." },
      { title: "Mark Zuckerberg's Password", story: "Facebook CEO Mark Zuckerberg's Twitter and Pinterest accounts were hacked because he reused the password 'dadada' — which was leaked in the LinkedIn breach. Even tech billionaires make basic password mistakes." }
    ],
    warningSignals: [
      "You receive notifications about login attempts from unknown locations",
      "You find yourself locked out of an account you didn't lock",
      "Friends report receiving strange messages from your accounts",
      "You see unfamiliar devices logged into your accounts",
      "You receive password reset emails you didn't request",
      "Your email has been found in a data breach (check haveibeenpwned.com)"
    ],
    prevention: [
      "Use a password manager (Bitwarden, 1Password, KeePass) to generate and store unique passwords.",
      "Create passwords with 16+ characters using random words (passphrase: 'correct-horse-battery-staple').",
      "Enable Two-Factor Authentication (2FA) on every account that supports it.",
      "Never reuse passwords — each account should have a completely unique password.",
      "Use biometric authentication (fingerprint, face ID) when available.",
      "Check haveibeenpwned.com regularly to see if your credentials have been leaked."
    ],
    dos: [
      "Use a unique password for EVERY account — no exceptions",
      "Enable 2FA/MFA with an authenticator app (not just SMS)",
      "Use passphrases: 4+ random words combined (e.g., 'purple-elephant-guitar-sunset')",
      "Change passwords immediately if a service you use reports a data breach",
      "Store passwords only in encrypted password managers"
    ],
    donts: [
      "Never write passwords on sticky notes attached to your monitor",
      "Don't use personal information in passwords (birthdays, pet names, your name)",
      "Don't share your passwords with anyone — not even family or IT support",
      "Don't use common passwords: 123456, password, qwerty, abc123",
      "Don't save passwords in your browser's built-in password manager (use a dedicated one instead)"
    ],
    stats: [
      { value: "65%", label: "of people reuse the same password everywhere" },
      { value: "80%", label: "of data breaches involve weak or stolen passwords" },
      { value: "< 1 sec", label: "to crack a 6-character password with modern tools" }
    ],
    quiz: [
      { question: "Which is the strongest password?", options: ["P@ssw0rd!", "MyDog2024", "purple-elephant-guitar-sunset-42!", "admin123"], answer: 2 },
      { question: "What is credential stuffing?", options: ["Guessing passwords randomly", "Using leaked passwords to access other accounts", "Stealing passwords via phishing", "Brute force hacking"], answer: 1 },
      { question: "What's the most important password security practice?", options: ["Changing passwords every week", "Using a unique password per account + 2FA", "Using longer versions of the same password", "Writing complex passwords on paper"], answer: 1 }
    ]
  },
  {
    id: "banking-fraud",
    title: "UPI & Banking Fraud",
    icon: "CreditCard",
    difficulty: "Beginner",
    duration: "11 min",
    explanation: "With the explosion of digital payments in India (UPI processes over 10 billion transactions per month), financial fraud has skyrocketed. Scammers exploit the convenience and simplicity of UPI, net banking, and digital wallets to trick victims into authorizing payments, sharing OTPs, or scanning malicious QR codes. These frauds are particularly devastating because victims often lose money instantly and irreversibly. Senior citizens and first-time digital users are the most vulnerable targets.",
    howItWorks: [
      "The scammer contacts you posing as a buyer on OLX/marketplace, bank official, or customer care executive.",
      "They create a scenario requiring you to 'verify your identity', 'receive a payment', or 'claim a refund'.",
      "They send you a QR code or payment link — which actually initiates a DEBIT (withdrawal) from your account.",
      "Alternatively, they ask for your OTP 'for verification' — the OTP actually authorizes a transaction.",
      "Money is instantly transferred to the scammer's account, often withdrawn or moved through multiple accounts within minutes."
    ],
    typesOrVariants: [
      { name: "QR Code Scam", desc: "Scammer sends a QR code claiming you need to scan it to 'receive' money. Scanning and entering UPI PIN actually SENDS money to the scammer." },
      { name: "OTP/CVV Theft", desc: "Attacker calls pretending to be from your bank, asks for card number, CVV, expiry date, and OTP to 'block a suspicious transaction' or 'update KYC'." },
      { name: "Fake Customer Care", desc: "Fraudulent customer care numbers appear in Google search results. Calling them leads to scammers who ask you to install screen-sharing apps like AnyDesk or TeamViewer." },
      { name: "SIM Swap Fraud", desc: "Attacker convinces your mobile carrier to transfer your number to their SIM. They then receive all your OTPs and reset your banking passwords." },
      { name: "Loan App Fraud", desc: "Predatory apps offer instant loans, then use harvested contacts and photos to harass and blackmail victims into paying exorbitant interest." },
      { name: "Refund Scam", desc: "You're told you're getting a refund for a cancelled order. A 'refund link' asks for your UPI PIN, which actually deducts money from your account." }
    ],
    realLifeExamples: [
      { title: "OLX QR Code Fraud", story: "A seller on OLX received a message from a 'buyer' who sent a QR code saying 'scan this to receive ₹5,000 advance payment.' The seller scanned the code and entered their UPI PIN, instantly losing ₹40,000 from their account." },
      { title: "Fake Paytm KYC Call", story: "A retired army officer received a call claiming his Paytm wallet would be blocked. The caller asked him to download AnyDesk and share a code 'for KYC verification'. The scammer gained screen access and transferred ₹4.7 lakh from multiple linked bank accounts." },
      { title: "Aadhaar-Enabled Payment (AePS) Fraud", story: "Scammers in Jharkhand collected fingerprints from property registration documents and used cloned biometrics to withdraw money from victims' bank accounts through Aadhaar-linked AePS without any OTP needed." }
    ],
    warningSignals: [
      "Anyone asking you to enter UPI PIN to RECEIVE money (UPI PIN is only for SENDING)",
      "Unsolicited calls about KYC expiry, account suspension, or reward claims",
      "Requests to install screen-sharing apps (AnyDesk, TeamViewer, QuickSupport)",
      "QR codes sent via WhatsApp from unknown buyers/sellers",
      "Calls from 'bank officials' asking for card number, CVV, or OTP",
      "SMS messages with links about 'failed transactions' or 'KYC updates'"
    ],
    prevention: [
      "GOLDEN RULE: You NEVER need to enter UPI PIN to receive money. Period.",
      "Never share OTP, CVV, card number, or PIN with anyone — banks never ask for these.",
      "Use only official banking apps from Play Store/App Store, not links sent to you.",
      "Set daily transaction limits on your UPI app and bank account.",
      "Report fraud immediately to your bank AND call the national helpline: 1930.",
      "Never search for 'customer care' numbers on Google — always use the number on your bank's official website or app."
    ],
    dos: [
      "Enable transaction alerts via SMS for every debit/credit to your account",
      "Lock your SIM card with a PIN to prevent SIM swap attacks",
      "Use the official bank app to check transaction history if you receive suspicious messages",
      "Freeze your Aadhaar biometrics at uidai.gov.in when not in use",
      "Report cyber fraud immediately at cybercrime.gov.in or call 1930"
    ],
    donts: [
      "NEVER enter UPI PIN when someone promises to 'send' you money",
      "Don't install screen-sharing apps at anyone's request",
      "Don't click links in SMS claiming transaction failures or KYC issues",
      "Never search Google for bank customer care numbers — they're often fake",
      "Don't share your screen while your banking app is open"
    ],
    stats: [
      { value: "₹10,319 Cr", label: "lost to financial cyber fraud in India (FY 2023-24)" },
      { value: "10B+", label: "UPI transactions per month in India" },
      { value: "7x", label: "increase in UPI fraud complaints in 3 years" }
    ],
    quiz: [
      { question: "Do you need to enter UPI PIN to receive money?", options: ["Yes, for verification", "Yes, for the first time only", "No, never", "Only for large amounts"], answer: 2 },
      { question: "What's the national cyber crime helpline number in India?", options: ["100", "112", "1930", "181"], answer: 2 },
      { question: "Someone from 'bank' calls asking for your OTP. What do you do?", options: ["Share it, they need it for security", "Ask them to call back later", "Hang up — banks never ask for OTPs", "Share only the first 3 digits"], answer: 2 }
    ]
  },
  {
    id: "identity-theft",
    title: "Identity Theft",
    icon: "UserX",
    difficulty: "Intermediate",
    duration: "12 min",
    explanation: "Identity theft is when someone steals and uses your personal information — name, Aadhaar/SSN, PAN, date of birth, bank details — to impersonate you for financial gain or criminal activity. Victims often don't discover the theft until they receive bills for purchases they never made, are denied loans due to bad credit, or worse — find criminal records in their name. In the digital age, your identity is scattered across hundreds of databases, making it an increasingly valuable target.",
    howItWorks: [
      "Attackers gather personal info through data breaches, phishing, social media mining, or physical theft (stolen mail/documents).",
      "They use this information to open bank accounts, apply for credit cards, file tax returns, or get medical treatment in your name.",
      "Digital identity theft may involve taking over existing accounts by resetting passwords using stolen personal data.",
      "Synthetic identity theft creates entirely new identities by combining real and fake data (your Aadhaar + a fake name).",
      "The damage can take months or years to discover and even longer to fully resolve."
    ],
    typesOrVariants: [
      { name: "Financial Identity Theft", desc: "Using your identity to open credit cards, take out loans, or make purchases. The most common type." },
      { name: "Medical Identity Theft", desc: "Using your identity to obtain healthcare, prescriptions, or insurance benefits. Can corrupt your medical records dangerously." },
      { name: "Criminal Identity Theft", desc: "Giving your identity to police when arrested. The criminal record then appears under your name." },
      { name: "Tax Identity Theft", desc: "Filing a fraudulent tax return using your PAN/SSN to claim your refund before you file." },
      { name: "Child Identity Theft", desc: "Stealing a child's clean identity (Aadhaar, SSN) to open accounts. Often goes undetected for years until the child turns 18." },
      { name: "Synthetic Identity Theft", desc: "Combining real data from multiple people with fake data to create a new, fictitious identity for fraud." }
    ],
    realLifeExamples: [
      { title: "Aadhaar Cloning in India", story: "Criminals obtained Aadhaar details from leaked databases and created duplicate Aadhaar cards. They used these to open bank accounts, obtain SIM cards, and commit financial fraud — all in the names of unsuspecting citizens." },
      { title: "The IRS Tax Fraud Epidemic", story: "In the US, identity thieves filed millions of fraudulent tax returns using stolen Social Security Numbers, claiming billions in fake refunds before the real taxpayers even filed their returns." },
      { title: "Deepfake Identity Fraud", story: "A bank in Hong Kong was scammed out of $25 million when fraudsters used AI deepfake technology to impersonate a company's CFO on a video call, convincing employees to authorize wire transfers." }
    ],
    warningSignals: [
      "Unfamiliar accounts or inquiries on your credit report",
      "Bills for products or services you never purchased",
      "Denied credit for no apparent reason",
      "Missing mail or redirected postal mail",
      "IRS/tax department notices about income you didn't earn",
      "Medical bills for treatments you never received",
      "Calls from debt collectors about debts you don't owe"
    ],
    prevention: [
      "Freeze your credit reports with all major bureaus (CIBIL in India, Equifax/Experian globally).",
      "Lock your Aadhaar biometrics at uidai.gov.in when not actively needed.",
      "Shred physical documents containing personal information before disposal.",
      "Use identity monitoring services that alert you to changes in your credit report.",
      "Limit the personal information you share on social media (DOB, location, family details).",
      "Use virtual/masked email addresses for online sign-ups (Apple's Hide My Email, Firefox Relay)."
    ],
    dos: [
      "Monitor your credit report at least quarterly (cibil.com in India)",
      "Set up fraud alerts with credit bureaus if you suspect compromise",
      "File an FIR immediately if your identity is stolen",
      "Use masked/virtual card numbers for online purchases",
      "Enable alerts on all bank accounts and credit cards"
    ],
    donts: [
      "Don't carry sensitive documents (PAN, Aadhaar, SSN cards) in your wallet",
      "Never share photos of ID documents on social media or messaging apps",
      "Don't provide personal info to unverified callers or websites",
      "Avoid using public Wi-Fi to access financial or identity-sensitive accounts",
      "Don't ignore unfamiliar entries on your credit report"
    ],
    stats: [
      { value: "33%", label: "of adults have experienced identity theft" },
      { value: "$52B", label: "lost to identity fraud in 2023 globally" },
      { value: "7 months", label: "average time to discover identity theft" }
    ],
    quiz: [
      { question: "What is synthetic identity theft?", options: ["Stealing someone's entire identity", "Combining real and fake data to create a new identity", "Hacking synthetic biology databases", "Using AI to clone voices"], answer: 1 },
      { question: "How often should you check your credit report?", options: ["Never", "Once in 10 years", "At least quarterly", "Only after a data breach"], answer: 2 }
    ]
  },
  {
    id: "social-media-safety",
    title: "Social Media Safety",
    icon: "Share2",
    difficulty: "Beginner",
    duration: "10 min",
    explanation: "Social media platforms are a goldmine for cybercriminals. The personal information you share — location, workplace, relationships, daily routines, vacation plans — provides everything an attacker needs for social engineering, identity theft, and targeted scams. Beyond direct attacks, social media enables cyberbullying, misinformation, stalking, and privacy erosion. With over 4.9 billion social media users worldwide, understanding how to use these platforms safely is essential for everyone.",
    howItWorks: [
      "Attackers scrape your public profiles to gather intelligence for social engineering attacks (where you work, your interests, your contacts).",
      "Fake profiles impersonate friends, brands, or romantic interests to build trust before executing scams.",
      "Malicious links disguised as viral content, quizzes, or breaking news deliver malware or harvest credentials.",
      "Oversharing information (like vacation posts) signals burglars that your home is empty.",
      "Data harvesting apps and quizzes (e.g., 'What Disney character are you?') collect personal information for identity theft."
    ],
    typesOrVariants: [
      { name: "Catfishing", desc: "Creating fake romantic profiles to emotionally manipulate victims, eventually requesting money for emergencies, travel, or medical bills." },
      { name: "Account Cloning", desc: "Creating a duplicate account of someone you know and sending friend requests to their contacts to execute scams." },
      { name: "Clickjacking", desc: "Hidden buttons/links on web pages that trick you into liking, sharing, or clicking things unknowingly." },
      { name: "Romance Scams", desc: "Long-term manipulation through fake relationships. Victims in India lost ₹822 crore to romance scams in 2022 alone." },
      { name: "Sextortion", desc: "Threatening to share intimate images (real or fabricated) unless victims pay money. Increasingly uses AI-generated deepfakes." }
    ],
    realLifeExamples: [
      { title: "Cambridge Analytica Scandal (2018)", story: "A quiz app on Facebook harvested personal data from 87 million users — not just those who took the quiz, but all their friends too. This data was used for political manipulation in elections." },
      { title: "Instagram Influencer Scams", story: "Fake brand collaboration offers are sent to influencers asking them to 'verify' by clicking a link. The link steals their Instagram credentials, and attackers take over accounts with thousands of followers." },
      { title: "LinkedIn Job Scam", story: "Scammers post fake high-paying job listings on LinkedIn. Applicants are asked to pay for 'background checks' or 'training materials' upfront, or are tricked into sharing identity documents for 'onboarding'." }
    ],
    warningSignals: [
      "Friend requests from people you're already friends with (account cloning)",
      "Messages from friends asking for money urgently",
      "Links promising 'See who viewed your profile' or 'Free followers'",
      "Romantic interests who never want to video call or meet in person",
      "Apps or quizzes asking for excessive permissions (contacts, photos, messages)",
      "Accounts with very few posts but many followers reaching out to you"
    ],
    prevention: [
      "Set all social media profiles to private — don't leave them public by default.",
      "Enable 2FA on all social media accounts (use authenticator app, not SMS).",
      "Be extremely cautious with friend requests from strangers or duplicated accounts.",
      "Never share your location in real-time; post vacation photos after returning home.",
      "Review and revoke permissions for third-party apps connected to your accounts.",
      "Think before you post: 'Could this information be used against me?'"
    ],
    dos: [
      "Audit your privacy settings on every platform monthly",
      "Use separate email addresses for social media and banking",
      "Report and block fake accounts immediately",
      "Google yourself periodically to see what's publicly visible",
      "Teach children about online safety before giving them social media access"
    ],
    donts: [
      "Don't accept friend requests from people you don't know in real life",
      "Never share photos of ID cards, boarding passes, or documents on social media",
      "Don't use social media login for third-party apps ('Login with Facebook/Google')",
      "Don't engage with viral quizzes that ask personal security-question-like info",
      "Never send money to someone you've only met online"
    ],
    stats: [
      { value: "4.9B", label: "social media users worldwide" },
      { value: "₹822 Cr", label: "lost to social media romance scams in India (2022)" },
      { value: "1 in 4", label: "social media users have been targeted by scams" }
    ],
    quiz: [
      { question: "What is 'catfishing'?", options: ["Fishing for data on social media", "Creating fake romantic profiles to scam people", "Hacking fish-related websites", "A phishing variant"], answer: 1 },
      { question: "When should you post vacation photos?", options: ["While on vacation", "Before leaving", "After returning home", "Never"], answer: 2 }
    ]
  },
  {
    id: "safe-online-shopping",
    title: "Safe Online Shopping",
    icon: "ShoppingCart",
    difficulty: "Beginner",
    duration: "9 min",
    explanation: "E-commerce fraud costs consumers billions annually. From fake websites that steal your payment information to counterfeit products, delivery scams, and fake reviews, the risks of online shopping extend far beyond just losing money. Cybercriminals create sophisticated clone websites of popular retailers, run fake 'clearance sales' on social media, and intercept payment data through insecure checkout processes. Knowing how to shop safely online is an essential digital life skill.",
    howItWorks: [
      "Attackers create convincing clone websites of popular stores (e.g., amaz0n-deals.com) with prices too good to be true.",
      "They promote fake deals through social media ads, WhatsApp forwards, and sponsored search results.",
      "Insecure checkout pages (no HTTPS, no trusted payment gateway) capture your card details directly.",
      "After payment, you either receive counterfeit/inferior products or nothing at all.",
      "Your stolen payment details are used for unauthorized purchases or sold on the dark web."
    ],
    typesOrVariants: [
      { name: "Fake E-commerce Sites", desc: "Cloned or completely fabricated online stores offering luxury goods at impossibly low prices. They take your money and never ship anything." },
      { name: "Social Media Marketplace Fraud", desc: "Scammers on Instagram/Facebook sell products using stolen photos. After payment, the seller disappears or sends cheap knockoffs." },
      { name: "Delivery/COD Scam", desc: "You receive an unexpected delivery demanding Cash on Delivery payment for a product you never ordered. Opening it reveals junk items." },
      { name: "Fake Review Manipulation", desc: "Products with thousands of 5-star fake reviews drown out genuine negative feedback, misleading consumers into buying poor products." },
      { name: "Payment Interception", desc: "Man-in-the-middle attacks on insecure (HTTP) checkout pages that capture your card details during transmission." }
    ],
    realLifeExamples: [
      { title: "Fake Nike Store Scam", story: "During Black Friday, a website called 'nike-outlet-sale.com' advertised shoes at 90% off. Thousands of people entered their credit card details. The site was completely fake — no shoes were shipped, and all card details were sold on the dark web." },
      { title: "Amazon Third-Party Seller Fraud", story: "A third-party seller listed a high-end laptop on Amazon at a significant discount. Buyers who paid received empty boxes or cheap tablets. The seller's fake reviews (all posted in the same week) fooled many customers." }
    ],
    warningSignals: [
      "Prices that are 80-90% below market value",
      "Website URL doesn't match the brand name (nike-sale-outlet.xyz vs nike.com)",
      "No HTTPS padlock on the checkout page",
      "Only accepts wire transfers or cryptocurrency — no credit card or PayPal option",
      "No physical address, return policy, or legitimate contact information",
      "All reviews are 5-star and posted within a short time period",
      "Social media ads for stores with very few followers and no history"
    ],
    prevention: [
      "Shop only from trusted, established retailers or verified marketplace sellers.",
      "Always check for HTTPS and the padlock icon before entering payment info.",
      "Use virtual/temporary card numbers for online purchases (most banks offer this).",
      "Pay with credit cards instead of debit cards — they offer better fraud protection.",
      "Research unfamiliar stores: check reviews on Trustpilot, search '[store name] scam'.",
      "Enable purchase alerts on your bank account to catch unauthorized charges immediately."
    ],
    dos: [
      "Use trusted payment gateways (PayPal, Razorpay, Stripe) when possible",
      "Check the seller's ratings, return policy, and history on marketplaces",
      "Take screenshots of orders and confirmation emails as proof",
      "Use a dedicated email for shopping to contain spam and phishing",
      "Enable transaction notifications for instant alerts on charges"
    ],
    donts: [
      "Don't buy from stores found only through social media ads with no web presence",
      "Never pay via wire transfer or cryptocurrency on unfamiliar sites",
      "Don't save card details on websites — enter them manually each time",
      "Don't ignore 'too good to be true' prices — they're almost always a scam",
      "Don't shop on public Wi-Fi without a VPN"
    ],
    stats: [
      { value: "$48B", label: "global e-commerce fraud losses annually" },
      { value: "57%", label: "of online shoppers have encountered a fake website" },
      { value: "30%", label: "of online reviews are estimated to be fake" }
    ],
    quiz: [
      { question: "What's the safest way to pay online?", options: ["Wire transfer", "Cryptocurrency", "Credit card with purchase protection", "Cash on delivery to unknown seller"], answer: 2 },
      { question: "A website offers 90% off on iPhones. What should you do?", options: ["Buy immediately before stock runs out", "Research the website and check reviews first", "Share the deal with friends", "Enter card details and hope for the best"], answer: 1 }
    ]
  },
  {
    id: "wifi-network-security",
    title: "Wi-Fi & Network Security",
    icon: "Wifi",
    difficulty: "Intermediate",
    duration: "11 min",
    explanation: "Your Wi-Fi network is the gateway to all your devices. An unsecured or compromised network lets attackers intercept your traffic, steal credentials, inject malware, and access everything connected to it — your phone, laptop, smart TV, IoT devices, and even security cameras. Public Wi-Fi networks in cafés, airports, and hotels are particularly dangerous as they often lack encryption, allowing anyone on the same network to monitor your activity.",
    howItWorks: [
      "On public Wi-Fi, attackers perform 'Man-in-the-Middle' (MitM) attacks — positioning themselves between you and the router to intercept all data.",
      "Evil Twin attacks create fake Wi-Fi hotspots with names like 'Starbucks_Free_WiFi' that look legitimate but are controlled by attackers.",
      "On home networks, attackers can exploit weak/default router passwords or outdated firmware to gain access.",
      "Once on your network, they can intercept unencrypted traffic, redirect DNS queries to fake sites, or access shared files and devices.",
      "IoT devices (smart cameras, thermostats) with weak security become entry points into your home network."
    ],
    typesOrVariants: [
      { name: "Man-in-the-Middle (MitM)", desc: "Attacker intercepts communication between your device and the router, reading and modifying data in transit." },
      { name: "Evil Twin", desc: "A rogue Wi-Fi hotspot that mimics a legitimate one. Your device may connect automatically, routing all traffic through the attacker." },
      { name: "Packet Sniffing", desc: "Using tools like Wireshark to capture and analyze network packets, extracting unencrypted passwords and data." },
      { name: "DNS Spoofing", desc: "Redirecting your DNS queries so that typing 'gmail.com' takes you to a fake Google login page controlled by the attacker." },
      { name: "Deauth Attack", desc: "Forcefully disconnecting devices from a legitimate Wi-Fi network, often used to force reconnection to an Evil Twin." }
    ],
    realLifeExamples: [
      { title: "Dark Hotel APT Group", story: "This hacking group targeted business travelers by compromising luxury hotel Wi-Fi networks. When executives connected and received a fake 'software update' prompt, they unknowingly installed spyware that stole corporate secrets." },
      { title: "Airport Wi-Fi Sniffing", story: "Security researchers demonstrated at an airport that by setting up a free Wi-Fi hotspot called 'Airport_Free_WiFi', they could capture emails, social media credentials, and even banking sessions from hundreds of travelers in just a few hours." }
    ],
    warningSignals: [
      "Multiple Wi-Fi networks with very similar names (legitimate + evil twin)",
      "Your browser shows certificate warnings on previously trusted sites",
      "Unexpectedly slow internet speeds (could indicate someone leeching or MitM)",
      "Unknown devices appearing on your home network's connected device list",
      "Your router's admin page is accessible with default credentials (admin/admin)"
    ],
    prevention: [
      "Always use a VPN on public Wi-Fi (ProtonVPN has a free tier, Mullvad for paid).",
      "Change your router's default admin password and SSID immediately after setup.",
      "Use WPA3 encryption (or WPA2 minimum) for your home Wi-Fi — never WEP or 'Open'.",
      "Disable WPS (Wi-Fi Protected Setup) on your router — it's vulnerable to brute force.",
      "Keep your router firmware updated to patch security vulnerabilities.",
      "Create a separate guest network for visitors and IoT devices."
    ],
    dos: [
      "Use 'Forget Network' for public Wi-Fi after use to prevent auto-reconnect",
      "Verify HTTPS is active on all sensitive websites before entering data",
      "Regularly check which devices are connected to your home network",
      "Use your mobile hotspot instead of public Wi-Fi when possible",
      "Enable your router's firewall and intrusion detection features"
    ],
    donts: [
      "Never do online banking or shopping on public Wi-Fi without a VPN",
      "Don't connect to open/unsecured Wi-Fi networks with no password",
      "Don't leave your router with factory default settings",
      "Never ignore browser SSL/TLS certificate warnings",
      "Don't share your Wi-Fi password widely — use a guest network instead"
    ],
    stats: [
      { value: "40%", label: "of users have had information compromised on public Wi-Fi" },
      { value: "25%", label: "of public Wi-Fi hotspots use no encryption at all" },
      { value: "81%", label: "of hacking-related breaches use stolen or weak credentials, often over Wi-Fi" }
    ],
    quiz: [
      { question: "What is an Evil Twin attack?", options: ["Two attackers working together", "A fake Wi-Fi hotspot mimicking a real one", "Cloning your SIM card", "A duplicate IP address"], answer: 1 },
      { question: "What should you always use on public Wi-Fi?", options: ["Bluetooth", "A VPN", "Ad blocker", "Incognito mode"], answer: 1 }
    ]
  },
  {
    id: "two-factor-auth",
    title: "Two-Factor Authentication (2FA)",
    icon: "ShieldCheck",
    difficulty: "Beginner",
    duration: "8 min",
    explanation: "Two-Factor Authentication (2FA), also called Multi-Factor Authentication (MFA), adds a crucial second layer of security beyond your password. Even if an attacker steals your password, they still can't access your account without the second factor — something you have (your phone) or something you are (biometrics). Enabling 2FA blocks 99.9% of automated account attacks. It is the single most effective security measure you can implement after using unique passwords.",
    howItWorks: [
      "You enter your username and password as usual (Factor 1: something you know).",
      "The service then asks for a second verification: an OTP from an authenticator app, a hardware key tap, or a biometric scan.",
      "Factor 2 proves you possess a specific device or have a specific biometric, not just knowledge of a password.",
      "Even if your password is compromised through a data breach, phishing, or brute force, the attacker can't pass the second factor.",
      "The best 2FA methods use time-based one-time passwords (TOTP) or hardware keys, not SMS (which can be intercepted via SIM swapping)."
    ],
    typesOrVariants: [
      { name: "Authenticator App (TOTP)", desc: "Apps like Google Authenticator, Authy, or Microsoft Authenticator generate time-based 6-digit codes that change every 30 seconds. Recommended for most users." },
      { name: "Hardware Security Key", desc: "Physical devices like YubiKey or Google Titan Key that you plug in or tap against your phone. The most secure 2FA method — phishing-proof." },
      { name: "SMS OTP", desc: "One-Time Passwords sent via text message. Convenient but vulnerable to SIM swap attacks and SS7 protocol exploits. Use as a last resort." },
      { name: "Biometrics", desc: "Fingerprint, face recognition, or iris scan. Convenient and secure, but not available on all services and can't be changed if compromised." },
      { name: "Push Notifications", desc: "A prompt appears on your registered device asking you to approve or deny the login attempt. Used by Google, Microsoft, and Duo." },
      { name: "Backup Codes", desc: "One-time recovery codes provided when you set up 2FA. Store them securely — they're your lifeline if you lose your phone." }
    ],
    realLifeExamples: [
      { title: "Google's Internal Security", story: "After Google mandated hardware security keys for all 85,000+ employees in 2017, the company reported ZERO successful phishing attacks against employee accounts. Not a single one." },
      { title: "Reddit Breach (2018)", story: "Reddit was breached because employee accounts were protected only by SMS-based 2FA. Attackers intercepted SMS OTPs through a SIM swap attack, bypassing the 2FA entirely. This highlighted why authenticator apps are superior to SMS." },
      { title: "Coinbase Account Takeovers", story: "Thousands of Coinbase users lost cryptocurrency when attackers used SIM swapping to intercept SMS OTP codes. Users who had authenticator app-based 2FA were not affected." }
    ],
    warningSignals: [
      "You receive 2FA codes you didn't request (someone is trying to log into your account!)",
      "Your phone suddenly loses cellular signal (potential SIM swap in progress)",
      "You receive approval prompts for login attempts you didn't make",
      "You're asked to 'share your OTP' by someone claiming to be from a service provider"
    ],
    prevention: [
      "Enable 2FA on EVERY account that supports it — email, banking, social media, cloud storage.",
      "Use an authenticator app (Google Authenticator, Authy) instead of SMS whenever possible.",
      "For critical accounts (email, banking), consider a hardware security key (YubiKey).",
      "Save backup/recovery codes in a secure location (encrypted note, password manager, physical safe).",
      "Never share OTP codes with anyone — legitimate services never ask for them.",
      "Set a SIM PIN with your mobile carrier to prevent unauthorized SIM swaps."
    ],
    dos: [
      "Prioritize enabling 2FA on your primary email first — it's the 'master key' to all other accounts",
      "Use Authy over Google Authenticator — it supports encrypted cloud backup of your tokens",
      "Store backup codes in your password manager or a physical safe",
      "Review which devices are trusted/logged in to your accounts periodically",
      "If you receive unexpected OTP codes, change your password IMMEDIATELY"
    ],
    donts: [
      "Never share OTP codes via phone, email, or text with ANYONE",
      "Don't rely solely on SMS-based 2FA for high-value accounts",
      "Don't screenshot your backup codes and store them in your photo gallery",
      "Never approve 2FA push notifications you didn't initiate",
      "Don't use the same authenticator app on a device that doesn't have a screen lock"
    ],
    stats: [
      { value: "99.9%", label: "of automated attacks blocked by 2FA" },
      { value: "0", label: "successful phishing attacks at Google after mandatory security keys" },
      { value: "50%+", label: "of people still don't use 2FA even when available" }
    ],
    quiz: [
      { question: "Which 2FA method is the MOST secure?", options: ["SMS OTP", "Email OTP", "Authenticator app", "Hardware security key"], answer: 3 },
      { question: "You receive an OTP you didn't request. What should you do?", options: ["Ignore it", "Share it if someone asks", "Change your password immediately", "Disable 2FA"], answer: 2 },
      { question: "Why is SMS-based 2FA less secure than an authenticator app?", options: ["SMS is slower", "SMS can be intercepted via SIM swap attacks", "SMS codes are longer", "There is no difference"], answer: 1 }
    ]
  },
  {
    id: "vpn-privacy",
    title: "VPN & Online Privacy",
    icon: "Globe",
    difficulty: "Intermediate",
    duration: "10 min",
    explanation: "A VPN (Virtual Private Network) creates an encrypted tunnel between your device and the internet, hiding your IP address and encrypting all your traffic. In an age of mass surveillance, ISP tracking, and data harvesting, a VPN is an essential privacy tool. However, not all VPNs are equal — free VPNs often log and sell your data, defeating the entire purpose. Understanding what a VPN does (and doesn't do) is key to making informed privacy decisions.",
    howItWorks: [
      "When you connect to a VPN, your device creates an encrypted tunnel to a VPN server.",
      "All your internet traffic travels through this encrypted tunnel, invisible to your ISP, network administrator, or anyone intercepting Wi-Fi.",
      "The VPN server decrypts your traffic and forwards it to its destination. Websites see the VPN server's IP address, not yours.",
      "Your real IP address and location are hidden, providing anonymity and bypassing geographic restrictions.",
      "The strength of a VPN depends on its encryption protocol (WireGuard, OpenVPN), no-log policy, and jurisdiction."
    ],
    typesOrVariants: [
      { name: "WireGuard", desc: "Modern, fast, lightweight VPN protocol. Uses state-of-the-art cryptography. Recommended for most users." },
      { name: "OpenVPN", desc: "Open-source, battle-tested protocol. Slightly slower than WireGuard but extremely well-audited and reliable." },
      { name: "IKEv2/IPSec", desc: "Good for mobile devices because it handles network switching (Wi-Fi to cellular) seamlessly." },
      { name: "Free VPNs", desc: "Often monetize by logging and selling your browsing data, injecting ads, or providing weak encryption. 'If you're not paying, you're the product.'" },
      { name: "Tor Network", desc: "Routes traffic through 3 volunteer-operated nodes for maximum anonymity. Much slower but nearly impossible to trace. Used for high-sensitivity privacy needs." }
    ],
    realLifeExamples: [
      { title: "Free VPN Data Leak (2021)", story: "Seven 'zero-log' free VPN providers were found to have leaked 1.2 TB of user data including email addresses, passwords, IP addresses, and browsing activity. The data was stored on an unsecured server — proving their 'no-log' claims were false." },
      { title: "Journalist Protection", story: "Journalists in authoritarian countries use VPNs and Tor daily to communicate with sources, publish reports, and access censored information without being identified or arrested by their governments." }
    ],
    warningSignals: [
      "A 'free' VPN asks for excessive permissions (contacts, phone state, location)",
      "VPN connection frequently drops without a kill switch activating",
      "You notice your real IP address leaking (test at ipleak.net while connected)",
      "The VPN provider's privacy policy mentions logging user activity",
      "Extremely slow speeds suggesting the VPN might be routing through additional logging servers"
    ],
    prevention: [
      "Use a reputable paid VPN with a verified no-log policy (ProtonVPN, Mullvad, Surfshark).",
      "Enable the VPN's kill switch to block all internet traffic if the VPN connection drops.",
      "Use DNS leak protection (most good VPNs include this).",
      "Avoid free VPNs — they often log your data, inject ads, and provide poor encryption.",
      "Use a VPN whenever you connect to public Wi-Fi, even briefly.",
      "For maximum privacy, combine a VPN with Tor browser for sensitive activities."
    ],
    dos: [
      "Test for IP and DNS leaks after connecting (use ipleak.net or dnsleaktest.com)",
      "Choose VPN servers geographically close to you for best speed",
      "Read the VPN provider's privacy policy and audit reports before subscribing",
      "Use the VPN's kill switch feature to prevent accidental data leaks",
      "Consider ProtonVPN's free tier if you can't afford a paid VPN — it's the only trustworthy free option"
    ],
    donts: [
      "Don't trust 'lifetime' VPN deals — they're usually scams",
      "Don't assume a VPN makes you completely anonymous — it's one layer of privacy",
      "Don't use a VPN headquartered in a Five Eyes surveillance country if privacy is critical",
      "Never use a VPN that doesn't have a clear, audited privacy policy",
      "Don't think a VPN replaces other security measures — you still need strong passwords, 2FA, etc."
    ],
    stats: [
      { value: "31%", label: "of internet users worldwide use a VPN" },
      { value: "72%", label: "of free VPNs contain tracking libraries" },
      { value: "1.2 TB", label: "of user data leaked by free VPN providers in a single incident" }
    ],
    quiz: [
      { question: "What does a VPN encrypt?", options: ["Only your passwords", "Only your emails", "All internet traffic between you and the VPN server", "Nothing, it only changes your IP"], answer: 2 },
      { question: "Why are free VPNs risky?", options: ["They're too fast", "They often log and sell your data", "They use too much battery", "They're illegal"], answer: 1 }
    ]
  },
  {
    id: "data-privacy",
    title: "Data Privacy & Digital Footprint",
    icon: "Eye",
    difficulty: "Advanced",
    duration: "14 min",
    explanation: "Every click, search, purchase, and social media interaction creates a digital footprint — a permanent trail of data about you. Companies, advertisers, data brokers, and governments collect, analyze, and trade this data to build detailed profiles of your behavior, preferences, health, finances, and relationships. Your data is the most valuable commodity of the 21st century. Understanding what's being collected, by whom, and how to minimize your exposure is fundamental to maintaining control over your digital life.",
    howItWorks: [
      "Cookies and trackers follow you across websites, building a profile of your interests and behavior.",
      "Apps on your phone continuously collect location data, contact lists, browsing history, and even microphone/camera input.",
      "Data brokers aggregate information from hundreds of sources to create comprehensive profiles that are sold to advertisers and other buyers.",
      "Social media platforms mine your posts, likes, shares, and messages to build psychological profiles used for ad targeting.",
      "Government surveillance programs collect metadata (who you called, when, for how long) from telecom providers.",
      "Even 'anonymous' data can often be re-identified using just 3-4 data points (age, zip code, gender)."
    ],
    typesOrVariants: [
      { name: "Active Digital Footprint", desc: "Data you intentionally share: social media posts, emails, form submissions, online reviews, comments." },
      { name: "Passive Digital Footprint", desc: "Data collected without your active participation: IP address, browsing history, cookies, location tracking, device fingerprinting." },
      { name: "Data Brokers", desc: "Companies that collect and sell personal data. Major brokers like Acxiom hold data on billions of people. You likely can't name them, but they know everything about you." },
      { name: "Device Fingerprinting", desc: "Websites identify you uniquely based on your browser configuration, installed fonts, screen resolution, and dozens of other parameters — even without cookies." },
      { name: "Metadata", desc: "Data about data. A photo's metadata reveals when, where, and with what device it was taken. Email metadata reveals sender, recipient, time, and IP address." }
    ],
    realLifeExamples: [
      { title: "Target Pregnancy Prediction", story: "US retailer Target used purchase data analytics to predict when customers were pregnant — sometimes before they told their families. A father complained about pregnancy-related coupons sent to his teenage daughter, only to learn she was indeed pregnant." },
      { title: "Strava Military Base Exposure (2018)", story: "The fitness app Strava published a global heat map of user activity. Analysts discovered it revealed the locations and layouts of secret military bases in Afghanistan, Syria, and other countries, because soldiers were tracking their jogs." }
    ],
    warningSignals: [
      "Ads that seem eerily specific to your recent conversations or thoughts",
      "Companies you've never heard of sending you marketing emails",
      "Your name and personal details appearing on people-search websites",
      "Apps requesting permissions that seem unrelated to their function",
      "Data breach notifications from services you forgot you signed up for"
    ],
    prevention: [
      "Use privacy-focused browsers (Brave, Firefox) and search engines (DuckDuckGo, Startpage).",
      "Install privacy extensions: uBlock Origin, Privacy Badger, HTTPS Everywhere.",
      "Review and minimize app permissions on your phone (Settings → Apps → Permissions).",
      "Opt out of data broker databases (search 'opt out [broker name]' for each).",
      "Use email aliases/masking for online sign-ups (SimpleLogin, Firefox Relay, Apple's Hide My Email).",
      "Regularly delete old accounts and unnecessary data — use justdeleteme.com as a guide."
    ],
    dos: [
      "Audit app permissions on your phone monthly",
      "Use a privacy-focused DNS resolver (1.1.1.1 by Cloudflare or NextDNS)",
      "Request your data from companies under GDPR/DPDP rights (Right to Access)",
      "Clear cookies and site data regularly, or use container tabs",
      "Read privacy policies — at least the sections on data sharing and retention"
    ],
    donts: [
      "Don't accept all cookies without reading — click 'Manage Preferences' and reject non-essential ones",
      "Don't use your real phone number for sign-ups when possible",
      "Don't leave location services on for all apps all the time",
      "Don't use the same email address for everything — compartmentalize",
      "Don't assume 'Delete' means permanently deleted — request formal data deletion under applicable laws"
    ],
    stats: [
      { value: "2.5 EB", label: "of data created every single day worldwide (2.5 exabytes)" },
      { value: "$240B", label: "annual revenue of the data broker industry" },
      { value: "72%", label: "of the world's most popular websites contain third-party trackers" }
    ],
    quiz: [
      { question: "What is a 'passive' digital footprint?", options: ["Data you intentionally post", "Data collected without your active participation", "Deleted social media posts", "Encrypted data"], answer: 1 },
      { question: "Which browser is most privacy-focused by default?", options: ["Chrome", "Edge", "Brave / Firefox", "Safari"], answer: 2 }
    ]
  },
  {
    id: "ai-threats",
    title: "AI Threats & Deepfakes",
    icon: "Cpu",
    difficulty: "Intermediate",
    duration: "12 min",
    explanation: "Artificial Intelligence has revolutionized cybersecurity—both for defenders and attackers. Generative AI tools allow cybercriminals to automate highly targeted phishing emails, generate realistic audio/video deepfakes to impersonate family members or company executives, write malware faster, and bypass voice-recognition authentication systems. AI-driven social engineering is incredibly persuasive because it mimics human patterns perfectly, making awareness of these techniques critical for digital defense.",
    howItWorks: [
      "Attackers collect small samples of a target's voice or image from public videos or social media platforms.",
      "Using AI voice synthesis or deepfake models, they generate audio or video clips speaking in the voice of the target.",
      "The cloned voice is used in high-pressure scenarios, like calling relatives claiming to be in an emergency requesting money.",
      "AI text generation tools write highly personalized spear-phishing emails tailored to the victim's industry or social groups.",
      "Automated bot systems use AI to dynamically respond to chat messages, making fake profiles appear human and active."
    ],
    typesOrVariants: [
      { name: "Voice Cloning (Audio Deepfakes)", desc: "Using less than 3 seconds of audio to clone someone's voice, then calling family or colleagues to demand money or sensitive details." },
      { name: "Video Deepfakes", desc: "Synthesizing realistic video clips to put someone's face on another person's body. Used for business scams or blackmail." },
      { name: "AI Phishing Generators", desc: "Using Large Language Models (LLMs) to write flawless, grammatically correct phishing emails in any language." },
      { name: "Adversarial Machine Learning", desc: "Tricking machine learning models (like face ID or spam filters) by feeding them specially crafted input." }
    ],
    realLifeExamples: [
      { title: "Hong Kong Deepfake Video Call (2024)", story: "A finance worker at a multinational firm was tricked into paying out $25 million after attending a video conference call with deepfakes of his CFO and other colleagues. He thought it was a real meeting." },
      { title: "The Kidnapping Voice Clone Scam", story: "A mother received a call from an unknown number. On the line, she heard her daughter crying for help, saying she had been kidnapped. A man then demanded a $50,000 ransom. The daughter was actually safe at school—the voice was entirely AI-generated from a TikTok video." }
    ],
    warningSignals: [
      "Voice calls from family members with flat emotional tones or unusual phrasing",
      "Strange, mechanical artifacts or background noises during calls",
      "Video callers who avoid turning sideways or have visual glitches around their eyes/mouths",
      "Immediate demand for cash or cryptocurrency via voice call from a relative claiming to be in distress",
      "Emails that use perfect vocabulary but address situations that seem out of context"
    ],
    prevention: [
      "Establish a 'family code word'—a secret word to verify identity in emergency calls.",
      "If you receive a suspicious call from a loved one in crisis, hang up and call them back on their known number.",
      "Limit public sharing of high-quality voice recordings or personal videos on social media.",
      "Be skeptical of unsolicited calls asking you to verify your voice or read a set of sentences.",
      "Keep software and operating systems updated to benefit from latest AI threat detectors."
    ],
    dos: [
      "Slow down and ask personal, specific questions only the real person would know",
      "Use multi-factor authentication (MFA) that does not rely solely on voice recognition",
      "Report deepfake scams immediately to local cyber authorities",
      "Educate family members about the existence of voice cloning technology",
      "Use secondary verification (such as text message or email) for financial requests"
    ],
    donts: [
      "Don't transfer money to anyone based on a phone call or video call request alone",
      "Never answer 'Yes' when an unknown caller asks 'Can you hear me?'—they may record your voice consent",
      "Don't believe caller ID—numbers can be spoofed to match your contacts",
      "Avoid publishing long, isolated video/audio files of yourself online",
      "Never share administrative login credentials based on a voice request"
    ],
    stats: [
      { value: "3,000%", label: "increase in deepfake creation since 2022" },
      { value: "$25M", label: "lost in a single deepfake video conference scam" },
      { value: "3 sec", label: "of voice audio needed to clone a human voice" }
    ],
    quiz: [
      { question: "What is the best defense against voice cloning scams?", options: ["Never answer the phone", "Establish a secret family code word", "Block all unknown numbers", "Use a voice changer"], answer: 1 },
      { question: "How much audio does an AI model typically need to clone a voice?", options: ["At least 2 hours", "Just 3 seconds", "About 30 minutes", "One full day"], answer: 1 }
    ]
  },
  {
    id: "iot-cloud",
    title: "IoT & Cloud Protection",
    icon: "Cloud",
    difficulty: "Intermediate",
    duration: "11 min",
    explanation: "Smart home devices (Internet of Things or IoT) like security cameras, smart TVs, routers, thermostats, and voice assistants offer great convenience but are often highly insecure. Cybercriminals target these devices to gain entry to your home network, steal private video feeds, or recruit them into global botnets to launch attacks on other systems. Similarly, misconfigured cloud storage and backups leak personal files and databases to the public internet daily. Securing your smart devices and cloud data is a primary line of defense.",
    howItWorks: [
      "Attackers scan the public internet for IoT devices running outdated software or using default administrative passwords.",
      "Once a device is compromised, they install custom firmware to control the camera feed or command the device.",
      "They use the compromised device as a pivot point to attack other computers connected to the same home Wi-Fi network.",
      "For cloud security, users upload backups to open storage containers (like AWS S3 buckets) without restricting access permissions.",
      "Web crawlers scan for these public cloud folders, downloading sensitive photos, files, and credentials."
    ],
    typesOrVariants: [
      { name: "IoT Botnets (e.g. Mirai)", desc: "Infecting thousands of smart devices globally to launch coordinated Distributed Denial of Service (DDoS) attacks." },
      { name: "Camera Hijacking", desc: "Exploiting weak passwords on IP cameras to spy on private spaces and upload feeds online." },
      { name: "Unsecured Cloud Buckets", desc: "Configuring cloud databases or file shares to be readable by anyone on the internet." },
      { name: "Cloud Account Takeover", desc: "Breaching credentials (often via phishing) to access full backups, photos, and personal cloud files." }
    ],
    realLifeExamples: [
      { title: "The Mirai Botnet Attack (2016)", story: "Mirai malware infected over 100,000 IoT devices (mostly digital cameras and routers) by exploiting default passwords. It launched a massive DDoS attack that took down Twitter, Netflix, and Reddit across the US East Coast." },
      { title: "Ring Camera Hack Scams", story: "Attackers guessed passwords for Ring security cameras using credential stuffing. They logged in, spoke to families through the cameras' speakers, and threatened them, showing the danger of weak passwords on smart home tech." }
    ],
    warningSignals: [
      "Smart devices behaving unexpectedly (cameras panning without input, devices restarting)",
      "Unusual spikes in home Wi-Fi network traffic or slow internet speeds",
      "Strange login notifications from cloud services (Google Drive, iCloud, OneDrive)",
      "You receive notifications about files being shared with unknown users from your cloud accounts",
      "Device admin dashboards requesting password resets out of nowhere"
    ],
    prevention: [
      "Change default passwords on all smart devices and routers immediately after purchase.",
      "Keep device firmware updated—apply security patches as soon as they are released.",
      "Set up a separate 'Guest Wi-Fi network' on your router exclusively for smart home/IoT devices.",
      "Disable UPnP (Universal Plug and Play) and remote management on your home router.",
      "Audit cloud sharing permissions periodically—ensure no files are shared publicly by default."
    ],
    dos: [
      "Enable Multi-Factor Authentication (MFA) on all cloud storage accounts",
      "Separate your work computers from IoT devices on your network",
      "Turn off smart devices when they are not in use (e.g., smart displays, webcams)",
      "Use robust encryption for cloud backups",
      "Check router settings to see what devices are connected to your Wi-Fi"
    ],
    donts: [
      "Don't leave default credentials (like 'admin' and '1234') on any smart device",
      "Never store unencrypted sensitive documents (like passwords or IDs) in the cloud",
      "Don't connect security-critical devices (like locks or cameras) to public Wi-Fi",
      "Avoid purchasing cheap, unbranded smart devices that do not receive updates",
      "Don't share cloud folders with public/anyone links unless absolutely necessary"
    ],
    stats: [
      { value: "1.5B", label: "IoT attacks recorded in the first half of 2021" },
      { value: "80%", label: "of routers contain known security vulnerabilities" },
      { value: "45%", label: "of cloud data breaches are caused by misconfigurations" }
    ],
    quiz: [
      { question: "Why is a guest network recommended for IoT devices?", options: ["It makes the internet faster", "It isolates smart devices from your personal computers", "It saves battery power", "It updates the devices automatically"], answer: 1 },
      { question: "What is the primary cause of cloud data breaches?", options: ["Hardware failures", "User/admin misconfigurations", "Physical server theft", "AI virus attacks"], answer: 1 }
    ]
  },
  {
    id: "crypto-scams",
    title: "Crypto & Web3 Scams",
    icon: "Coins",
    difficulty: "Advanced",
    duration: "14 min",
    explanation: "The decentralized, pseudonymous, and irreversible nature of cryptocurrency makes it a prime target for financial scammers. Once crypto is transferred out of your wallet, it cannot be refunded or recalled. Attackers use sophisticated Web3 exploits, malicious smart contracts, fake wallet apps, and social engineering to steal digital assets. Understanding how blockchain networks operate and recognizing common cryptocurrency scams is essential for anyone dealing with digital currencies.",
    howItWorks: [
      "Scammers create a fake token or project, inflating its price through hype (shilling) on social media platforms.",
      "Alternatively, they send phishing links directing users to connect their Web3 wallet (like MetaMask) to a malicious decentralized app (dApp).",
      "When connecting, the user unknowingly signs a smart contract transaction that grants the dApp permission to withdraw all assets.",
      "Other scams involve convincing the victim to share their 12-to-24 word wallet recovery phrase (seed phrase).",
      "Once the phrase is revealed or transaction signed, all crypto and NFTs are instantly drained to the attacker's address."
    ],
    typesOrVariants: [
      { name: "Rug Pulls", desc: "Developers launch a new crypto project, collect funds from investors, then suddenly abandon the project and drain all liquidity." },
      { name: "Wallet Draining dApps", desc: "Malicious Web3 websites that request smart contract approval to spend your tokens, draining your wallet upon signature." },
      { name: "Seed Phrase Phishing", desc: "Fake support pages or browser extensions claiming to fix wallet issues by asking you to enter your recovery seed phrase." },
      { name: "Pig Butchering (Romance/Investment Scams)", desc: "Long-term grooming where scammers build trust, then guide victims to deposit life savings into fake crypto trading platforms." }
    ],
    realLifeExamples: [
      { title: "The Squid Game Token Rug Pull (2021)", story: "Developers created a cryptocurrency based on the viral show 'Squid Game'. The token soared by thousands of percent. Suddenly, the creators shut down the website, disabled trading, and walked away with an estimated $3.38 million in investor funds." },
      { title: "MetaMask Support Phishing", story: "Scammers set up fake customer support bots on Twitter. When users posted about wallet issues, the bots replied with a link to a Google Form asking for their 12-word seed phrase. Drained wallets followed shortly after." }
    ],
    warningSignals: [
      "Any request for your 12-to-24 word wallet seed phrase (wallets never ask for this)",
      "Websites asking for high-limit token spending approvals (e.g. infinite allowance)",
      "High-return investment promises ('double your crypto in 24 hours!')",
      "A dApp that requires immediate connection to execute an urgent 'airdrop' or 'claim'",
      "Unknown tokens mysteriously appearing in your wallet address"
    ],
    prevention: [
      "NEVER type or share your seed phrase on any website or with any person. Store it physically offline.",
      "Always read transaction details before signing them in your wallet extension.",
      "Use hardware wallets (cold storage) for large, long-term crypto holdings.",
      "Verify smart contract addresses on block explorers (like Etherscan) before interacting.",
      "Use browser extensions that block malicious Web3 sites (like Pocket Universe or Revoke.cash)."
    ],
    dos: [
      "Regularly revoke smart contract allowances using sites like Revoke.cash",
      "Keep separate wallets for daily dApp interactions and long-term storage",
      "Double-check website URLs before connecting your wallet",
      "Report scams to cyber police and listing platforms (CoinGecko, CoinMarketCap)",
      "Be skeptical of unsolicited investment advice on Discord and Telegram"
    ],
    donts: [
      "Never store your seed phrase in a digital format (notes app, screenshot, cloud)",
      "Don't click links for 'free airdrops'—they are almost always wallet-draining traps",
      "Don't sign transactions that you do not fully understand",
      "Avoid investing in projects with anonymous teams and no code audits",
      "Never share your screen while your crypto wallet app is open"
    ],
    stats: [
      { value: "$5.9B", label: "lost to crypto scams and hacks in 2023" },
      { value: "100%", label: "of crypto transactions are irreversible" },
      { value: "$3.3M+", label: "stolen in the Squid Game token rug pull in minutes" }
    ],
    quiz: [
      { question: "Where is the safest place to store your wallet recovery seed phrase?", options: ["In a secure password manager", "On a physical piece of paper stored offline", "In a draft email", "On your computer desktop"], answer: 1 },
      { question: "What does Revoke.cash do?", options: ["It deletes your wallet", "It cancels smart contract token spending permissions", "It recovers stolen cryptocurrency", "It hacks blockchain systems"], answer: 1 }
    ]
  },
  {
    id: "mobile-safety",
    title: "Mobile Hardening & App Safety",
    icon: "Smartphone",
    difficulty: "Beginner",
    duration: "10 min",
    explanation: "Our smartphones are central hubs for our digital lives, holding banking apps, personal photos, messaging accounts, and location details. Cybercriminals target mobile devices through malicious apps, overlay scams, notification hijacking, and fake system updates. Predatory apps on official app stores or side-loaded APK files can silently steal contacts, intercept SMS verification codes (OTPs), spy via the camera, and make unauthorized transactions. Hardening your phone's security settings is essential to protecting your privacy.",
    howItWorks: [
      "A user downloads an app—such as a PDF reader or flashlight utility—that request excessive permissions (like SMS read or accessibility).",
      "The app utilizes accessibility permissions to perform overlay attacks, drawing fake login screens over banking apps.",
      "When the user logs in, the fake screen captures their credentials and sends them to the attacker.",
      "The app intercepts incoming SMS messages, automatically forwarding OTPs to the attacker's server.",
      "The attacker logs into the banking app, completes transactions, and deletes the OTP notification so the victim doesn't notice."
    ],
    typesOrVariants: [
      { name: "Overlay Attacks", desc: "Drawing a fake UI over a legitimate app to steal credentials. Common in mobile banking trojans." },
      { name: "Accessibility Exploits", desc: "Abusing Android's Accessibility service to click buttons, read screen text, and steal credentials automatically." },
      { name: "Predatory Loan Apps", desc: "Apps that offer quick loans, then copy the user's contact list and photos to blackmail them with high interest rates." },
      { name: "Side-loading Malware", desc: "Installing apps from unofficial websites (APK files) that bypass system security checks." }
    ],
    realLifeExamples: [
      { title: "Anubis Banking Trojan", story: "Anubis malware disguised itself as a battery saver or utility app on the Google Play Store. Once installed, it asked for accessibility permissions, recorded keys, drew fake banking overlays, and stole login details from over 250 financial apps." },
      { title: "Predatory Loan Blackmail", story: "A victim downloaded a quick loan app. The app requested contact access. When the victim was late on a payment, the app creators sent morphed, offensive photos of the victim to all their family, friends, and co-workers." }
    ],
    warningSignals: [
      "A simple utility app (like a calculator or keyboard) asking for SMS, contact, or location access",
      "Rapid battery drain or phone running unusually hot when idle",
      "Unexpected pop-ups, system warning messages, or sudden settings changes",
      "Apps that request you to enable 'Accessibility Services' or 'Install Unknown Apps'",
      "Incoming SMS text messages marked as 'Read' that you never opened"
    ],
    prevention: [
      "Only download apps from official stores (Google Play, Apple App Store)—never side-load APKs.",
      "Review app permissions (Settings ➔ Apps ➔ Permissions)—revoke unnecessary ones immediately.",
      "Never grant 'Accessibility Service' permissions to any app unless you have a verified, trusted accessibility need.",
      "Keep your phone's operating system and security patches fully updated.",
      "Use biometric locks (fingerprint, face unlock) instead of simple PINs or patterns."
    ],
    dos: [
      "Uninstall unused apps regularly to reduce attack surface",
      "Enable Google Play Protect or Apple's built-in security scans",
      "Read user reviews, especially negative ones, before downloading new apps",
      "Use a PIN to lock your SIM card to prevent physical theft swaps",
      "Check your phone's account sync settings for unknown connected accounts"
    ],
    donts: [
      "Never download app versions of popular games (like 'Minecraft Free') from third-party sites",
      "Don't click links in WhatsApp or SMS messages that invite you to install apps",
      "Don't root (Android) or jailbreak (iOS) your phone—it disables critical system security layers",
      "Don't charge your phone using public USB ports without a USB data blocker ('USB condom')",
      "Don't save sensitive login credentials in web browsers on your mobile device"
    ],
    stats: [
      { value: "95%", label: "of mobile malware targets the Android platform" },
      { value: "2M+", label: "malicious apps blocked by Google Play Protect daily" },
      { value: "48%", label: "of employees have downloaded a malicious app on their phone" }
    ],
    quiz: [
      { question: "Why is granting 'Accessibility Services' permission to untrusted apps dangerous?", options: ["It drains battery power", "It allows the app to read your screen and click buttons on your behalf", "It makes your screen blurry", "It changes your wallpaper settings"], answer: 1 },
      { question: "What is an overlay attack?", options: ["Covering the phone screen physically", "Drawing a fake login screen over a real app to steal passwords", "Sending spam notifications", "A network virus"], answer: 1 }
    ]
  }
];
