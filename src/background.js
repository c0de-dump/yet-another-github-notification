async function poll() {
    const data = await browser.storage.sync.get('token')
    const token = data.token

    try {
        const notifications = getNotifications(token)
    } catch (error) {
        console.error(error)
        browser.storage.sync.remove('token')
    }
}

async function getNotifications(token) {
    if (token === undefined) {
        return
    }

    const response = await fetch('https://api.github.com/notifications', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (response.status !== 200) {
        console.error(`${response.status}: ${response.statusText}`)
        throw new Error('Error fetching notifications')
    }

    return await response.json()
}

poll()
browser.alarms.onAlarm.addListener(poll)
browser.alarms.create('poll', { periodInMinutes: 5 })
