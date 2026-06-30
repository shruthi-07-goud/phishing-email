let lastRiskScore = 0;
let lastClassification = "";
let lastReasons = [];

function analyzeEmail() {
    const emailField = document.getElementById("emailText");
    const senderField = document.getElementById("senderEmail");
    const result = document.getElementById("result");

    // Prevent crashing if elements are missing
    const email = emailField ? emailField.value.toLowerCase().trim() : "";
    const sender = senderField ? senderField.value.toLowerCase().trim() : "";

    if (email === "" && sender === "") {
        result.className = "";
        result.innerHTML = "<h3>Please enter a sender email or paste email body content first.</h3>";
        return;
    }

    let score = 0;
    let reasons = [];
    let senderVerdictHTML = "";

    // SENDER EMAIL ID SECURITY ENGINE
    if (sender !== "") {
        let isFakeSender = false;
        let senderReason = "";

        if (sender.endsWith(".xyz") || sender.endsWith(".ru") || sender.endsWith(".top") || sender.endsWith(".click") || sender.endsWith(".loan")) {
            isFakeSender = true;
            score += 3;
            senderReason = "❌ [DANGER] Sender uses a high-risk untrusted Top-Level Domain extension.";
        }
        else if ((sender.includes("paypal") || sender.includes("bank") || sender.includes("netflix") || sender.includes("google") || sender.includes("support")) && 
                 (sender.endsWith("@gmail.com") || sender.endsWith("@yahoo.com") || sender.endsWith("@outlook.com"))) {
            isFakeSender = true;
            score += 3;
            senderReason = "❌ [DANGER] Fake Profile! Official brands never use public free webmail addresses.";
        }
        else if (sender.includes("login") || sender.includes("verify") || sender.includes("security-update")) {
            isFakeSender = true;
            score += 2;
            senderReason = "⚠️ [SUSPICIOUS] Subdomain contains misleading phrases.";
        }

        if (isFakeSender) {
            reasons.push(senderReason);
            senderVerdictHTML = `<div class="sender-badge fake-domain"><strong>Sender Verification:</strong> FAKE / DANGER (${sender})</div>`;
        } else {
            senderVerdictHTML = `<div class="sender-badge safe-domain"><strong>Sender Verification:</strong> SAFE / LEGITIMATE (${sender})</div>`;
        }
    }

    // Email Body Phrase Matching
    if (email.includes("urgent") || email.includes("immediately") || email.includes("within 24 hours") || email.includes("action required")) {
        score++; reasons.push("⚠️ Uses urgent language.");
    }
    if (email.includes("verify your account") || email.includes("login now") || email.includes("confirm your account")) {
        score++; reasons.push("⚠️ Requests account verification.");
    }
    if (email.includes("click here") || email.includes("click below")) {
        score++; reasons.push("⚠️ Contains suspicious link request.");
    }
    if (email.includes("password")) {
        score++; reasons.push("⚠️ Requests password.");
    }
    if (email.includes("bank") || email.includes("credit card") || email.includes("debit card")) {
        score++; reasons.push("⚠️ Requests banking information.");
    }
    if (email.includes("lottery") || email.includes("winner") || email.includes("won") || email.includes("prize")) {
        score++; reasons.push("⚠️ Lottery / prize scam.");
    }
    if (email.includes("bit.ly") || email.includes("tinyurl") || email.includes(".xyz") || email.includes(".ru")) {
        score++; reasons.push("⚠️ Suspicious URL detected.");
    }
    if (email.includes(".exe") || email.includes(".zip") || email.includes(".scr")) {
        score++; reasons.push("⚠️ Dangerous attachment detected.");
    }
    if (email.includes("@gmail.com") || email.includes("@yahoo.com") || email.includes("@outlook.com")) {
        score++; reasons.push("⚠️ Uses free email domain.");
    }
    if (email.includes("gift") || email.includes("free") || email.includes("reward")) {
        score++; reasons.push("⚠️ Too-good-to-be-true offer.");
    }

    let risk = Math.min(score * 10, 100);
    let color = "green";
    if (risk >= 70) color = "red";
    else if (risk >= 40) color = "orange";

    lastRiskScore = risk;
    lastReasons = reasons;

    // Word Highlighter
    let originalText = emailField ? emailField.value : "";
    let highlightedText = originalText;
    const triggerWords = ["urgent", "immediately", "within 24 hours", "action required", "verify your account", "login now", "confirm your account", "click here", "click below", "password", "bank", "credit card", "debit card", "lottery", "winner", "won", "prize", "bit.ly", "tinyurl", ".xyz", ".ru", ".exe", ".zip", "gift", "free", "reward"];

    triggerWords.forEach(word => {
        const regex = new RegExp(`(${word})`, "gi");
        highlightedText = highlightedText.replace(regex, `<mark class="danger-word">$1</mark>`);
    });

    let displayHighlightHTML = originalText !== "" ? `
        <div class="visual-highlight-box">
            <strong>🔍 Trigger Word Highlights:</strong>
            <p style="white-space: pre-wrap; margin-top: 5px; font-size: 14px; line-height: 1.4;">${highlightedText}</p>
        </div>
    ` : "";

    let resultsContent = `
        <h3>Risk Score : ${risk}%</h3>
        <div class="progress"><div class="progress-bar" style="width:${risk}%;background:${color};">${risk}%</div></div>
        ${senderVerdictHTML}
        ${displayHighlightHTML}
    `;

    if (score >= 7) {
        lastClassification = "PHISHING EMAIL";
        result.className = "phishing";
        result.innerHTML = `<h2>🚨 PHISHING EMAIL</h2>` + resultsContent + `
        <h3>Detected Indicators</h3><ul>${reasons.map(r => `<li>${r}</li>`).join("")}</ul>
        <h3>Recommendation</h3><p>❌ Do not click links.<br>❌ Do not download attachments.<br>❌ Never share passwords.<br>✅ Report the email.<br>✅ Delete the email immediately.</p>
        <button onclick="downloadReport()" class="download-report-btn"><i class="fa-solid fa-file-arrow-down"></i> Download Security Report</button>`;
    } else if (score >= 3) {
        lastClassification = "SUSPICIOUS EMAIL";
        result.className = "suspicious";
        result.innerHTML = `<h2>⚠️ SUSPICIOUS EMAIL</h2>` + resultsContent + `
        <h3>Detected Indicators</h3><ul>${reasons.map(r => `<li>${r}</li>`).join("")}</ul>
        <h3>Recommendation</h3><p>Verify the sender before clicking links or replying.</p>
        <button onclick="downloadReport()" class="download-report-btn"><i class="fa-solid fa-file-arrow-down"></i> Download Security Report</button>`;
    } else {
        lastClassification = "SAFE EMAIL";
        result.className = "safe";
        result.innerHTML = `<h2>✅ SAFE EMAIL</h2>` + resultsContent + `
        ${reasons.length > 0 ? `<h3>Detected Indicators</h3><ul>${reasons.map(r => `<li>${r}</li>`).join("")}</ul>` : '<p>No major phishing indicators were detected.</p>'}
        <p>Still verify the sender before sharing personal information.</p>
        <button onclick="downloadReport()" class="download-report-btn"><i class="fa-solid fa-file-arrow-down"></i> Download Security Report</button>`;
    }
}

function downloadReport() {
    let output = `==================================================\n       PHISHING ASSESSMENT THREAT REPORT         \n==================================================\n\nGenerated On  : ${new Date().toLocaleString()}\nSender Email  : ${document.getElementById("senderEmail").value || "Not Entered"}\nSecurity State: ${lastClassification}\nCalculated Score: ${lastRiskScore}%\n\n--------------------------------------------------\nDETECTED PHISHING INDICATORS:\n--------------------------------------------------\n`;
    if (lastReasons.length > 0) {
        lastReasons.forEach((reason, index) => { output += `${index + 1}. ${reason}\n`; });
    } else {
        output += `[-] No critical risk keywords matched rulesets.\n`;
    }
    output += `\n==================================================\n`;

    const blob = new Blob([output], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Phishing_Analysis_Report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function loadSafeEmail() {
    document.getElementById("senderEmail").value = "billing@netflix.com";
    document.getElementById("emailText").value = `Subject: Meeting Reminder\n\nDear Team,\n\nThis is a reminder that our weekly meeting is scheduled for tomorrow at 10:00 AM.\n\nThank you.\n\nRegards,\nHR Team`;
    analyzeEmail();
}

function loadSuspiciousEmail() {
    document.getElementById("senderEmail").value = "paypal-security-update@gmail.com";
    document.getElementById("emailText").value = `Subject: Verify Your Account\n\nDear Customer,\n\nPlease verify your account immediately to avoid temporary suspension.\n\nClick below for verification.\n\nRegards`;
    analyzeEmail();
}

function loadPhishingEmail() {
    document.getElementById("senderEmail").value = "alert-support@banking-verify.xyz";
    document.getElementById("emailText").value = `URGENT!\n\nYour bank account will be suspended within 24 hours.\n\nClick Here\n\nhttp://bit.ly/security-check\n\nLogin Now\n\nReply with your password immediately.`;
    analyzeEmail();
}
