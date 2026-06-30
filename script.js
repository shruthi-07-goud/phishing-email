*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial, Helvetica, sans-serif;
}

body{
    background:#eef3f8;
    color:#333;
}

/* Header */
header{
    background:#0f172a;
    color:white;
    text-align:center;
    padding:30px 20px;
}

header h1{
    font-size:34px;
    margin-bottom:10px;
}

header p{
    color:#cbd5e1;
}

/* Main Layout Structure */
.container{
    width:90%;
    max-width:1200px;
    margin:30px auto;
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:25px;
}

/* Form Styles */
.input-group {
    margin-bottom: 15px;
}

.input-group label {
    display: block;
    margin-bottom: 5px;
    color: #0f172a;
}

.input-group input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 15px;
    outline: none;
}

.input-group input:focus {
    border: 2px solid #2563eb;
}

label {
    display: block;
    margin-bottom: 5px;
    margin-top: 10px;
}

/* Cards */
.card{
    background:white;
    padding:25px;
    border-radius:15px;
    box-shadow:0 5px 15px rgba(0,0,0,.15);
}

.card h2{
    margin-bottom:20px;
    color:#0f172a;
}

/* Text Area */
textarea{
    width:100%;
    height:220px;
    padding:15px;
    border:1px solid #ccc;
    border-radius:10px;
    font-size:16px;
    resize:none;
    outline:none;
}

textarea:focus{
    border:2px solid #2563eb;
}

/* Button UI Components */
button{
    width:100%;
    margin-top:20px;
    padding:15px;
    border:none;
    border-radius:10px;
    background:#2563eb;
    color:white;
    font-size:18px;
    cursor:pointer;
    transition:.3s;
}

button:hover{
    background:#1d4ed8;
}

/* Result Box Classes */
#result{
    margin-top:10px;
    padding:20px;
    border-radius:10px;
    min-height:300px;
}

.safe{
    background:#dcfce7;
    border-left:8px solid green;
}

.suspicious{
    background:#fef3c7;
    border-left:8px solid orange;
}

.phishing{
    background:#fee2e2;
    border-left:8px solid red;
}

/* Live Highlighter Elements */
.highlight-container {
    background: rgba(255, 255, 255, 0.7);
    padding: 12px;
    border-radius: 8px;
    margin: 15px 0;
    border: 1px dashed #aaa;
}

.highlighted-box {
    white-space: pre-wrap;
    line-height: 1.5;
    font-size: 14px;
}

.highlight-trigger {
    background-color: #fca5a5;
    color: #991b1b;
    font-weight: bold;
    padding: 1px 4px;
    border-radius: 4px;
}

/* Progress Bar Components */
.progress{
    width:100%;
    background:#ddd;
    height:20px;
    border-radius:20px;
    margin:15px 0;
    overflow:hidden;
}

.progress-bar{
    height:100%;
    background:red;
    width:0%;
    color:white;
    text-align:center;
    font-size:12px;
    line-height:20px;
    font-weight: bold;
}

ul{
    margin-left:20px;
    margin-top:10px;
}

li{
    margin-bottom:8px;
}

/* Awareness Sections */
.tips{
    width:90%;
    max-width:1200px;
    margin:40px auto;
}

.tips h2{
    text-align:center;
    margin-bottom:30px;
    color:#0f172a;
}

.tips-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
    gap:20px;
}

.tip{
    background:white;
    padding:20px;
    border-radius:12px;
    box-shadow:0 3px 10px rgba(0,0,0,.12);
    transition:.3s;
}

.tip:hover{
    transform:translateY(-5px);
}

.tip h3{
    margin-bottom:10px;
    color:#2563eb;
}

/* Footer Section */
footer{
    background:#0f172a;
    color:white;
    text-align:center;
    padding:20px;
    margin-top:40px;
}

/* Preset Buttons Layout */
.sample-buttons{
    display:flex;
    gap:10px;
    margin-top:15px;
    margin-bottom:5px;
}

.sample-buttons button{
    flex:1;
    padding:12px;
    font-size:14px;
    margin-top:0px;
}

/* Navigation Configuration */
nav{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:10px 5%;
    background:#0f172a;
}

.logo{
    color:white;
    font-size:22px;
    font-weight:bold;
}

nav ul{
    display:flex;
    list-style:none;
    gap:20px;
}

nav ul li a{
    color:white;
    text-decoration:none;
    font-weight:bold;
}

nav ul li a:hover{
    color:#38bdf8;
}

.about{
    width:90%;
    max-width:1200px;
    margin:40px auto;
    background:white;
    padding:30px;
    border-radius:12px;
    box-shadow:0 5px 15px rgba(0,0,0,.15);
}

.about h2{
    margin-bottom:15px;
    color:#0f172a;
}

.about p{
    line-height:1.8;
}

/* Mobile Responsive Optimization Media Queries */
@media(max-width:900px){
    .container{
        grid-template-columns:1fr;
    }
    header h1{
        font-size:26px;
    }
}

@media(max-width:700px){
    .sample-buttons{
        flex-direction:column;
        gap:5px;
    }
    nav {
        flex-direction: column;
        gap: 10px;
    }
}
