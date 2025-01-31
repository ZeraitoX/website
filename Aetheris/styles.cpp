@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap');

html, body {
    margin: 0;
    padding: 0;
    background-color: #0a0a0a; /* 背景を黒 */
    color: white;
    font-family: 'Inter', sans-serif;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px;
    background: black;
}

.logo {
    font-size: 24px;
    font-weight: bold;
}

nav a {
    color: white;
    text-decoration: none;
    margin: 0 15px;
    font-size: 14px;
}

.purchase {
    background-color: #00c6a7;
    padding: 10px 15px;
    border-radius: 5px;
}

main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80vh;
    padding: 50px;
    background: #0a0a0a; /* メイン部分も黒に */
}

.content {
    max-width: 50%;
}

h1 {
    font-size: 48px;
    margin: 0;
}

p {
    font-size: 16px;
    margin: 20px 0;
    color: #bfbfbf;
}

.highlight {
    background-color: #00c6a7;
    padding: 5px;
    border-radius: 5px;
    color: black;
}

.buttons {
    margin-top: 20px;
}

.btn {
    background-color: #00c6a7;
    padding: 12px 20px;
    text-decoration: none;
    color: black;
    font-weight: bold;
    border-radius: 5px;
    margin-right: 10px;
}

.learn {
    color: white;
    text-decoration: none;
    font-size: 16px;
}

.image img {
    max-width: 400px;
    filter: drop-shadow(0px 0px 20px #00c6a7);
}
