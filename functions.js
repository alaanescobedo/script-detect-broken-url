export async function getBrokenUrls(urlList) {
    let index = 0;
    const brokenUrls = await Promise.all(urlList.map(async (url, i) => {

        const res = await new Promise(resolve => {
            setTimeout(async () => {
                resolve(await fetch(url))
            }, i * 400) //Time to avoid 429 error - Too Many Requests 
        })

        if (res.status === 429) {
            console.log(`${res.status} - To many requests`)
            console.log('Finishing process...')
            process.exit(1)
        }
        if (res.status !== 200) {
            console.log(`${index++} - ${url}`)
            return url
        }
    }))

    return brokenUrls.filter(url => url !== undefined)
}

// The key is 4 to separate the repository of TheAlgorithms / Algorithms-Explanation by programming language
export function sortUrlsToJSON({ urls, indexKey = 4 }) {
    return urls.reduce((acc, url) => {
        const key = url.split('/')[indexKey]
        acc[key] = [...acc[key] || [], url]
        return acc
    }, { total: urls.length })
}