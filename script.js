// Global memory handles to store properties for reporting features
let globalRisk = 0;
let globalClassification = "No analysis";
let globalReasons = [];
let globalRawText = "";

function analyzeEmail() {
    const email = document.getElementById("emailText").value.toLowerCase().trim();
    const result = document.getElementById("result");

    if (email === "") {
        result.className = "";
        result.innerHTML = "<h3>Please paste an email first.</h3>";
        return;
    }

    let score = 0;
    let reasons = [];

    // Your Exact Detection Rules
    if (email.includes("urgent") || email.includes("immediately") || email.includes("within 24 hours") || email.includes("action required")) {
        score++;
        reasons.push("⚠️ Uses urgent language.");
    }
    if (email.includes("verify your account") || email.includes("login now") || email.includes("confirm your account")) {
        score++;
        reasons.push("⚠️ Requests account verification.");
    }
    if (email.includes("click here") || email.includes("click below")) {
        score++;
        reasons.push("⚠️ Contains suspicious link request.");
    }
    if (email.includes("password")) {
        score++;
        reasons.push("⚠️ Requests password.");
    }
    if (email.includes("bank") || email.includes("credit card") || email.includes("debit card")) {
        score++;
        reasons.push("⚠️ Requests banking information.");
    }
    if (email.includes("lottery") || email.includes("winner") || email.includes("won") || email.includes("prize")) {
        score++;
        reasons.push("⚠️ Lottery / prize scam.");
    }
    if (email.includes("bit.ly") || email.includes("tinyurl") || email.includes(".xyz") || email.includes(".ru")) {
        score++;
        reasons.push("⚠️ Suspicious URL detected.");
    }
    if (email.includes(".exe") || email.includes(".zip") || email.includes(".scr")) {
        score++;
        reasons.push("⚠️ Dangerous attachment detected.");
    }
    if (email.includes("@gmail.com") || email.includes("@yahoo.com") || email.includes("@outlook.com")) {
        score++;
        reasons.push("⚠️ Uses free email domain.");
    }
    if (email.includes("gift") || email.includes("free") || email.includes("reward")) {
        score++;
        reasons.push("⚠️ Too-good-to-be-true offer.");
    }

    // Risk calculation logic 
    let risk = Math.min(score * 10, 100);
    let color = "green";

    if (risk >= 70) color = "red";
    else if (risk >= 40) color = "orange";

    // Sync variables globally for report downloading
    globalRisk = risk;
    globalReasons = reasons;
    globalRawText = document.getElementById("emailText").value;

    // --- FEATURE: DYNAMIC WORD HIGHLIGHTER ---
    let highlightedText = globalRawText;
    const targets = [
        "urgent", "immediately", "within 24 hours", "action required",
        "verify your account", "login now", "confirm your account",
        "click here", "click below", "password", "bank", "credit card",
        "debit card", "lottery", "winner", "won", "prize", "bit.ly",
        "tinyurl", ".xyz", ".ru", ".exe", ".zip", "gift", "free", "reward"
    ];

    targets.forEach(word => {
        const regex = new RegExp(`(${word})`, "gi");
        highlightedText = highlightedText.replace(regex, `<mark class="inline-flag">$1</mark>`);
    });

    let displayHighlightHTML = `
        <div class="highlight-container">
            <h4>🔍 Trigger Word Highlights:</h4>
            <p class="highlighted-box">${highlightedText}</p>
        </div>
    `;

    // Render results view matching your exact conditional setup
    if (score >= 7) {
        globalClassification = "PHISHING EMAIL";
        result.className = "phishing";
        result.innerHTML = `
        <h2>🚨 PHISHING EMAIL</h2>
        <h3>Risk Score : ${risk}%</h3>
        <div class="progress"><div class="progress-bar" style="width:${risk}%;background:${color};">${risk}%</div></div>
        ${displayHighlightHTML}
        <h3>Detected Indicators</h3>
        <ul>${reasons.map(r => `<li>${r}</li>`).join("")}</ul>
        <h3>Recommendation</h3>
        <p>❌ Do not click links.<br>❌ Do not download attachments.<br>❌ Never share passwords.<br>✅ Report the email.<br>✅ Delete the email immediately.</p>
        <button onclick="downloadSecurityReport()" class="btn-report"><i class="fa-solid fa-file-arrow-down"></i> Download Security Report</button>
        `;
    } else if (score >= 3) {
        globalClassification = "SUSPICIOUS EMAIL";
        result.className = "suspicious";
        result.innerHTML = `
        <h2>⚠️ SUSPICIOUS EMAIL</h2>
        <h3>Risk Score : ${risk}%</h3>
        <div class="progress"><div class="progress-bar" style="width:${risk}%;background:${color};">${risk}%</div></div>
        ${displayHighlightHTML}
        <h3>Detected Indicators</h3>
        <ul>${reasons.map(r => `<li>${r}</li>`).join("")}</ul>
        <h3>Recommendation</h3>
        <p>Verify the sender before clicking links or replying.</p>
        <button onclick="downloadSecurityReport()" class="btn-report"><i class="fa-solid fa-file-arrow-down"></i> Download Security Report</button>
        `;
    } else {
        globalClassification = "SAFE EMAIL";
        result.className = "safe";
        result.innerHTML = `
        <h2>✅ SAFE EMAIL</h2>
        <h3>Risk Score : ${risk}%</h3>
        <div class="progress"><div class="progress-bar" style="width:${risk}%;background:${color};">${risk}%</div></div>
        ${displayHighlightHTML}
        <p>No major phishing indicators were detected.</p>
        <p>Still verify the sender before sharing personal information.</p>
        <button onclick="downloadSecurityReport()" class="btn-report"><i class="fa-solid fa-file-arrow-down"></i> Download Security Report</button>
        `;
    }
}

// FEATURE: SECURE REPORT GENERATOR DOWNLOAD
function downloadSecurityReport() {
    let text = `==================================================\n`;
    text += `       PHISHING DETECTION REPORT METRICS          \n`;
    text += `==================================================\n\n`;
    text += `Timestamp     : ${new Date().toLocaleString()}\n`;
    text += `Verdict       : ${globalClassification}\n`;
    text += `Risk Rating   : ${globalRisk}%\n\n`;
    text += `--------------------------------------------------\n`;
    text += `TRIGGERED CYBER THREAT INDICATORS:\n`;
    text += `--------------------------------------------------\n`;
    
    if (globalReasons.length > 0) {
        globalReasons.forEach((r, idx) => { text += `${idx + 1}. ${r}\n`; });
    } else {
        text += `[-] No suspicious key phrases identified.\n`;
    }
    
    text += `\n==================================================\n`;
    
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Security_Analysis_Report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Your original loading configurations
function loadSafeEmail() {
    document.getElementById("emailText").value = `Subject: Meeting Reminder\n\nDear Team,\n\nThis is a reminder that our weekly meeting is scheduled for tomorrow at 10:00 AM.\n\nThank you.\n\nRegards,\nHR Team`;
    analyzeEmail();
}

function loadSuspiciousEmail() {
    document.getElementById("emailText").value = `Subject: Verify Your Account\n\nDear Customer,\n\nPlease verify your account immediately to avoid temporary suspension.\n\nClick below for verification.\n\nRegards`;
    analyzeEmail();
}

function loadPhishingEmail() {
    document.getElementById("emailText").value = `URGENT!\n\nYour bank account will be suspended within 24 hours.\n\nClick Here\n\nhttp://bit.ly/security-check\n\nLogin Now\n\nReply with your password immediately.`;
    analyzeEmail();
}
