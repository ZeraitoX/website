const guildId = 'YOUR_GUILD_ID';
const botToken = 'YOUR_BOT_TOKEN';

async function fetchServerStats() {
    const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}/widget.json`, {
        headers: {
            Authorization: `Bot ${botToken}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        const totalMembers = data.members.length;
        const onlineMembers = data.members.filter(member => member.status === 'online').length;

        document.getElementById('total-members').innerText = totalMembers;
        document.getElementById('online-members').innerText = onlineMembers;
        document.getElementById('offline-members').innerText = totalMembers - onlineMembers;
    } else {
        console.error('Failed to fetch data.');
    }
}

fetchServerStats();
setInterval(fetchServerStats, 60000); // Update every 60 seconds
