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

    // Detection Rules

    if (email.includes("urgent") ||
        email.includes("immediately") ||
        email.includes("within 24 hours") ||
        email.includes("action required")) {
        score++;
        reasons.push("⚠️ Uses urgent language.");
    }

    if (email.includes("verify your account") ||
        email.includes("login now") ||
        email.includes("confirm your account")) {
        score++;
        reasons.push("⚠️ Requests account verification.");
    }

    if (email.includes("click here") ||
        email.includes("click below")) {
        score++;
        reasons.push("⚠️ Contains suspicious link request.");
    }

    if (email.includes("password")) {
        score++;
        reasons.push("⚠️ Requests password.");
    }

    if (email.includes("bank") ||
        email.includes("credit card") ||
        email.includes("debit card")) {
        score++;
        reasons.push("⚠️ Requests banking information.");
    }

    if (email.includes("lottery") ||
        email.includes("winner") ||
        email.includes("won") ||
        email.includes("prize")) {
        score++;
        reasons.push("⚠️ Lottery / prize scam.");
    }

    if (email.includes("bit.ly") ||
        email.includes("tinyurl") ||
        email.includes(".xyz") ||
        email.includes(".ru")) {
        score++;
        reasons.push("⚠️ Suspicious URL detected.");
    }

    if (email.includes(".exe") ||
        email.includes(".zip") ||
        email.includes(".scr")) {
        score++;
        reasons.push("⚠️ Dangerous attachment detected.");
    }

    if (email.includes("@gmail.com") ||
        email.includes("@yahoo.com") ||
        email.includes("@outlook.com")) {
        score++;
        reasons.push("⚠️ Uses free email domain.");
    }

    if (email.includes("gift") ||
        email.includes("free") ||
        email.includes("reward")) {
        score++;
        reasons.push("⚠️ Too-good-to-be-true offer.");
    }

    // Risk Score

    let risk = Math.min(score * 10, 100);

    let color = "green";

    if (risk >= 70)
        color = "red";
    else if (risk >= 40)
        color = "orange";

    // Result

    if (score >= 7) {

        result.className = "phishing";

        result.innerHTML = `
        <h2>🚨 PHISHING EMAIL</h2>

        <h3>Risk Score : ${risk}%</h3>

        <div class="progress">
            <div class="progress-bar"
            style="width:${risk}%;background:${color};">
            ${risk}%
            </div>
        </div>

        <h3>Detected Indicators</h3>

        <ul>
        ${reasons.map(r => `<li>${r}</li>`).join("")}
        </ul>

        <h3>Recommendation</h3>

        <p>
        ❌ Do not click links.<br>
        ❌ Do not download attachments.<br>
        ❌ Never share passwords.<br>
        ✅ Report the email.<br>
        ✅ Delete the email immediately.
        </p>
        `;

    }

    else if (score >= 3) {

        result.className = "suspicious";

        result.innerHTML = `
        <h2>⚠️ SUSPICIOUS EMAIL</h2>

        <h3>Risk Score : ${risk}%</h3>

        <div class="progress">
            <div class="progress-bar"
            style="width:${risk}%;background:${color};">
            ${risk}%
            </div>
        </div>

        <h3>Detected Indicators</h3>

        <ul>
        ${reasons.map(r => `<li>${r}</li>`).join("")}
        </ul>

        <h3>Recommendation</h3>

        <p>
        Verify the sender before clicking links or replying.
        </p>
        `;

    }

    else {

        result.className = "safe";

        result.innerHTML = `
        <h2>✅ SAFE EMAIL</h2>

        <h3>Risk Score : ${risk}%</h3>

        <div class="progress">
            <div class="progress-bar"
            style="width:${risk}%;background:${color};">
            ${risk}%
            </div>
        </div>

        <p>No major phishing indicators were detected.</p>

        <p>Still verify the sender before sharing personal information.</p>
        `;
    }

}
function loadSafeEmail(){

document.getElementById("emailText").value=`Subject: Meeting Reminder

Dear Team,

This is a reminder that our weekly meeting is scheduled for tomorrow at 10:00 AM.

Thank you.

Regards,
HR Team`;

}


function loadSuspiciousEmail(){

document.getElementById("emailText").value=`Subject: Verify Your Account

Dear Customer,

Please verify your account immediately to avoid temporary suspension.

Click below for verification.

Regards`;

}


function loadPhishingEmail(){

document.getElementById("emailText").value=`URGENT!

Your bank account will be suspended within 24 hours.

Click Here

http://bit.ly/security-check

Login Now

Reply with your password immediately.`;

}