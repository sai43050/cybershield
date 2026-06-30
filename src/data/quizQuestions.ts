export const quizQuestions = [
  // ── Phishing (6 questions) ──
  {
    id: 1,
    category: "Phishing",
    question: "What is 'Phishing'?",
    options: [
      "A technique to catch fish using digital sensors",
      "Fraudulent attempts to obtain sensitive information by disguising as a trustworthy entity",
      "A type of firewall to block malicious traffic",
      "A secure way to transmit data over the internet"
    ],
    answer: 1,
    explanation: "Phishing is a social engineering attack where an attacker sends a fraudulent message designed to trick a person into revealing sensitive information."
  },
  {
    id: 2,
    category: "Phishing",
    question: "What is 'Spear Phishing'?",
    options: [
      "Mass email spam",
      "A phishing attack targeted at a specific individual using personal info",
      "Phishing via social media",
      "Phishing that uses spear-shaped malware"
    ],
    answer: 1,
    explanation: "Spear phishing targets specific individuals using personalized information gathered from social media or data breaches."
  },
  {
    id: 3,
    category: "Phishing",
    question: "You receive an email from 'support@paypa1.com' about suspicious activity. What's wrong?",
    options: [
      "Nothing, it's from PayPal",
      "The domain uses '1' instead of 'l' — it's a fake",
      "PayPal never sends emails",
      "The email is encrypted so it's safe"
    ],
    answer: 1,
    explanation: "Typosquatting uses domains with subtle misspellings (paypa1 vs paypal) to trick users. Always check sender domains carefully."
  },
  {
    id: 4,
    category: "Phishing",
    question: "Which of these is the SAFEST action when you get an 'account suspended' email?",
    options: [
      "Click the link and log in to check",
      "Reply asking for more details",
      "Go directly to the official website by typing the URL yourself",
      "Forward it to friends to check"
    ],
    answer: 2,
    explanation: "Never click links in suspicious emails. Always navigate to the service directly by typing the URL or using a bookmark."
  },
  {
    id: 5,
    category: "Phishing",
    question: "What is 'Vishing'?",
    options: [
      "Video phishing",
      "Voice/phone call phishing",
      "Virtual phishing",
      "A type of firewall"
    ],
    answer: 1,
    explanation: "Vishing (Voice Phishing) uses phone calls to impersonate banks, tech support, or government agencies to steal information."
  },
  {
    id: 6,
    category: "Phishing",
    question: "A password manager can protect against phishing because:",
    options: [
      "It blocks all emails",
      "It won't auto-fill credentials on fake websites",
      "It encrypts your internet connection",
      "It deletes phishing emails automatically"
    ],
    answer: 1,
    explanation: "Password managers verify the website domain before auto-filling — they won't fill your PayPal password on 'paypa1.com'."
  },

  // ── Malware (5 questions) ──
  {
    id: 7,
    category: "Malware",
    question: "What is a Trojan Horse in cybersecurity?",
    options: [
      "A firewall bypass tool",
      "Malware disguised as legitimate software",
      "A type of VPN",
      "An encryption algorithm"
    ],
    answer: 1,
    explanation: "A Trojan disguises itself as a useful program (game, utility) but secretly performs malicious actions like stealing data."
  },
  {
    id: 8,
    category: "Malware",
    question: "How does a worm differ from a virus?",
    options: [
      "Worms need a host program to spread",
      "Worms can spread independently without user action",
      "Viruses are always more dangerous",
      "There is no difference"
    ],
    answer: 1,
    explanation: "Worms self-replicate and spread across networks automatically, while viruses need a host program and user action to propagate."
  },
  {
    id: 9,
    category: "Malware",
    question: "What is 'fileless malware'?",
    options: [
      "Malware that deletes all your files",
      "Malware that only infects small files",
      "Malware that operates entirely in memory without writing files to disk",
      "Malware hidden in file names"
    ],
    answer: 2,
    explanation: "Fileless malware lives in RAM and leverages legitimate system tools, making it extremely difficult for traditional antivirus to detect."
  },
  {
    id: 10,
    category: "Malware",
    question: "The #1 delivery method for malware is:",
    options: [
      "USB drives",
      "App stores",
      "Email attachments and links",
      "Bluetooth"
    ],
    answer: 2,
    explanation: "92% of malware is delivered via email. Malicious attachments and links in phishing emails are the primary infection vector."
  },
  {
    id: 11,
    category: "Malware",
    question: "What should you do FIRST if you suspect malware infection?",
    options: [
      "Delete all files immediately",
      "Disconnect from the internet",
      "Restart the computer",
      "Change your wallpaper"
    ],
    answer: 1,
    explanation: "Disconnecting from the internet prevents the malware from spreading to other devices, communicating with C2 servers, or exfiltrating data."
  },

  // ── Ransomware (4 questions) ──
  {
    id: 12,
    category: "Ransomware",
    question: "What is Ransomware?",
    options: [
      "Software that steals your personal photos",
      "Malware that encrypts your files and demands payment to restore access",
      "A tool used to bypass network security",
      "A legitimate software to lock your computer"
    ],
    answer: 1,
    explanation: "Ransomware takes your files hostage by encrypting them and demands a ransom, usually in cryptocurrency."
  },
  {
    id: 13,
    category: "Ransomware",
    question: "What is 'double extortion' ransomware?",
    options: [
      "Charging twice the ransom amount",
      "Encrypting AND stealing data, threatening to publish it",
      "Attacking two companies simultaneously",
      "Using two types of encryption"
    ],
    answer: 1,
    explanation: "Double extortion ransomware steals your data before encrypting it, then threatens to publish it online if you don't pay."
  },
  {
    id: 14,
    category: "Ransomware",
    question: "What is the 3-2-1 backup rule?",
    options: [
      "3 passwords, 2 emails, 1 phone",
      "3 copies of data, 2 different media types, 1 offsite backup",
      "3 firewalls, 2 antivirus programs, 1 VPN",
      "3 admins, 2 users, 1 guest account"
    ],
    answer: 1,
    explanation: "The 3-2-1 rule ensures your data survives any disaster: 3 copies, on 2 different types of media, with 1 stored offsite."
  },
  {
    id: 15,
    category: "Ransomware",
    question: "Should you pay the ransom if your files are encrypted?",
    options: [
      "Yes, to get your files back quickly",
      "Yes, if the amount is small",
      "No — it funds crime and doesn't guarantee data recovery",
      "Only if they accept credit cards"
    ],
    answer: 2,
    explanation: "80% of victims who pay get attacked again. Payment funds criminal operations and provides no guarantee of file recovery."
  },

  // ── Password Security (4 questions) ──
  {
    id: 16,
    category: "Password Security",
    question: "Which of these is the STRONGEST password?",
    options: [
      "P@ssw0rd!",
      "MyDogRex2024",
      "purple-elephant-guitar-sunset-42!",
      "admin123456"
    ],
    answer: 2,
    explanation: "Long passphrases with random words are much stronger than short passwords with character substitutions."
  },
  {
    id: 17,
    category: "Password Security",
    question: "What is 'credential stuffing'?",
    options: [
      "Creating very long passwords",
      "Using leaked username-password pairs from one breach to access other accounts",
      "Encrypting stored passwords",
      "A brute-force attack method"
    ],
    answer: 1,
    explanation: "Credential stuffing exploits password reuse. When one service is breached, attackers try those same credentials on hundreds of other sites."
  },
  {
    id: 18,
    category: "Password Security",
    question: "How long does it take to crack a 6-character password?",
    options: [
      "Several days",
      "A few hours",
      "Less than 1 second with modern tools",
      "It's impossible to crack"
    ],
    answer: 2,
    explanation: "Modern GPUs can try billions of password combinations per second. A 6-character password is cracked almost instantly."
  },
  {
    id: 19,
    category: "Password Security",
    question: "What's the single most important password security practice?",
    options: [
      "Changing passwords every week",
      "Using a unique password for EVERY account + enabling 2FA",
      "Making passwords with lots of special characters",
      "Writing passwords in a notebook"
    ],
    answer: 1,
    explanation: "Unique passwords prevent a breach on one site from compromising all your other accounts. 2FA adds a critical second layer."
  },

  // ── Social Engineering (3 questions) ──
  {
    id: 20,
    category: "Social Engineering",
    question: "What is Social Engineering?",
    options: [
      "Building social media applications",
      "Manipulating people psychologically to give up confidential information",
      "Programming robots to mimic human behavior",
      "Analyzing social networks for marketing"
    ],
    answer: 1,
    explanation: "Social engineering exploits human psychology — trust, fear, urgency — rather than technical vulnerabilities."
  },
  {
    id: 21,
    category: "Social Engineering",
    question: "An unknown 'IT person' calls asking for your password to 'fix an urgent issue'. What do you do?",
    options: [
      "Give the password since they're from IT",
      "Ask them to send an email instead",
      "Hang up and call the IT department directly using the official number",
      "Share it if they know your employee ID"
    ],
    answer: 2,
    explanation: "Always verify identity through official channels. Legitimate IT support will never ask for your password over the phone."
  },
  {
    id: 22,
    category: "Social Engineering",
    question: "What is 'Business Email Compromise' (BEC)?",
    options: [
      "A company's email server crashes",
      "Impersonating a CEO via email to authorize fraudulent wire transfers",
      "Sending too many business emails",
      "Encrypting company emails"
    ],
    answer: 1,
    explanation: "BEC attacks impersonate executives to trick employees into wiring money. They caused $2.7 billion in losses in 2022."
  },

  // ── Banking Fraud (3 questions) ──
  {
    id: 23,
    category: "Banking Fraud",
    question: "Do you need to enter your UPI PIN to RECEIVE money?",
    options: [
      "Yes, for verification",
      "Yes, for the first time only",
      "No, NEVER — UPI PIN is only for sending money",
      "Only for large amounts"
    ],
    answer: 2,
    explanation: "You NEVER need to enter your UPI PIN to receive money. If someone asks you to, it's a 100% scam."
  },
  {
    id: 24,
    category: "Banking Fraud",
    question: "What's the national cyber crime helpline number in India?",
    options: [
      "100",
      "112",
      "1930",
      "181"
    ],
    answer: 2,
    explanation: "Call 1930 immediately to report cyber financial fraud. You can also report at cybercrime.gov.in."
  },
  {
    id: 25,
    category: "Banking Fraud",
    question: "Someone from 'your bank' calls asking for your OTP. What do you do?",
    options: [
      "Share it — they need it for security",
      "Ask them to call back later",
      "Hang up immediately — banks NEVER ask for OTPs by phone",
      "Share only the first 3 digits"
    ],
    answer: 2,
    explanation: "No legitimate bank, company, or government agency will EVER call and ask for your OTP, CVV, or PIN."
  },

  // ── Two-Factor Authentication (3 questions) ──
  {
    id: 26,
    category: "Two-Factor Authentication",
    question: "What is Two-Factor Authentication (2FA)?",
    options: [
      "Using two different passwords",
      "A security process requiring two different authentication factors",
      "Logging in from two devices",
      "A type of antivirus software"
    ],
    answer: 1,
    explanation: "2FA requires something you know (password) AND something you have (phone/key) or are (biometric)."
  },
  {
    id: 27,
    category: "Two-Factor Authentication",
    question: "Which 2FA method is the MOST secure?",
    options: [
      "SMS OTP",
      "Email OTP",
      "Authenticator app",
      "Hardware security key (YubiKey)"
    ],
    answer: 3,
    explanation: "Hardware keys are phishing-proof. Google had ZERO successful phishing attacks after mandating them for all 85,000+ employees."
  },
  {
    id: 28,
    category: "Two-Factor Authentication",
    question: "Why is SMS-based 2FA less secure than an authenticator app?",
    options: [
      "SMS codes are shorter",
      "SMS can be intercepted via SIM swap attacks",
      "SMS is slower",
      "There is no difference"
    ],
    answer: 1,
    explanation: "SIM swapping allows attackers to transfer your phone number to their SIM, intercepting all your SMS OTP codes."
  },

  // ── Network & Wi-Fi Security (3 questions) ──
  {
    id: 29,
    category: "Network Security",
    question: "What is an 'Evil Twin' Wi-Fi attack?",
    options: [
      "Two routers connected together",
      "A fake Wi-Fi hotspot that mimics a legitimate one",
      "Two users with the same password",
      "A duplicate IP address"
    ],
    answer: 1,
    explanation: "Evil Twin hotspots look identical to real networks (e.g., 'Starbucks_WiFi'). Your device may auto-connect, routing all traffic through the attacker."
  },
  {
    id: 30,
    category: "Network Security",
    question: "What should you ALWAYS use on public Wi-Fi?",
    options: [
      "Bluetooth",
      "A VPN",
      "An ad blocker",
      "Incognito mode"
    ],
    answer: 1,
    explanation: "A VPN encrypts all your traffic, making it unreadable even on compromised public Wi-Fi networks."
  },
  {
    id: 31,
    category: "Network Security",
    question: "Why should you avoid banking on public Wi-Fi without a VPN?",
    options: [
      "It's too slow for banking",
      "Banks block public Wi-Fi connections",
      "Attackers on the same network can intercept your unencrypted data",
      "It uses too much data"
    ],
    answer: 2,
    explanation: "Public Wi-Fi often lacks encryption. Man-in-the-Middle attacks can intercept your login credentials and financial data."
  },

  // ── Privacy & Data (3 questions) ──
  {
    id: 32,
    category: "Privacy",
    question: "What is a 'passive' digital footprint?",
    options: [
      "Data you intentionally post online",
      "Data collected without your active participation (cookies, IP logs, tracking)",
      "Deleted social media posts",
      "Encrypted communications"
    ],
    answer: 1,
    explanation: "Passive footprints are created without your direct action — websites tracking your IP, cookies following you, device fingerprinting."
  },
  {
    id: 33,
    category: "Privacy",
    question: "What should you do before discarding an old hard drive?",
    options: [
      "Delete files manually",
      "Format it once",
      "Perform a secure data wipe or physically destroy it",
      "Just throw it in the trash"
    ],
    answer: 2,
    explanation: "Simply deleting or formatting doesn't remove data permanently. A secure wipe overwrites data; physical destruction ensures unrecoverability."
  },
  {
    id: 34,
    category: "Privacy",
    question: "Which browser is most privacy-focused by default?",
    options: [
      "Google Chrome",
      "Microsoft Edge",
      "Brave / Firefox",
      "Internet Explorer"
    ],
    answer: 2,
    explanation: "Brave blocks ads and trackers by default. Firefox with privacy extensions offers similar protection. Chrome collects data for Google's ad business."
  },

  // ── General Security (2 questions) ──
  {
    id: 35,
    category: "General Security",
    question: "What does HTTPS stand for and why is it important?",
    options: [
      "HyperText Transfer Protocol Secure — encrypts data between browser and website",
      "High Tech Transfer Protocol Service — makes websites faster",
      "Hyperlink Text Transfer Protocol Standard — improves SEO",
      "None of the above"
    ],
    answer: 0,
    explanation: "HTTPS encrypts communication between your browser and the website, preventing interception of sensitive data like passwords."
  },
  {
    id: 36,
    category: "General Security",
    question: "You receive an unexpected email with an attachment from a known contact. The subject looks off. What do you do?",
    options: [
      "Open the attachment immediately",
      "Forward it to friends to check",
      "Contact the sender through a separate channel (phone/text) to verify",
      "Reply asking if it's safe"
    ],
    answer: 2,
    explanation: "Attackers often hijack or spoof contacts' email accounts. Verify through a separate channel before opening any suspicious attachment."
  }
];
