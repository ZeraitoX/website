body {
    margin: 0;
    padding: 0;
    background-color: #121212;
    color: white;
    font-family: Arial, sans-serif;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.logo img {
    height: 120px;
}

.subtitle {
    font-size: 18px;
    margin-bottom: 30px;
}

.buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
}

.button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 30px;
    font-size: 16px;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: 0.3s;
    width: 160px;
}

.download {
    background-color: #4caf50;
}

.github {
    background-color: #ffffff;
    color: black;
}

.discord {
    background-color: #7289da;
}

.button:hover {
    opacity: 0.8;
}

.button img {
    height: 20px;
    margin-right: 10px;
}
