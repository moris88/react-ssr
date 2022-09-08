import React from 'react'

const Test = () => {

    const [response, setResponse] = React.useState<any>({})

    React.useEffect(() => {
        ; (async () => {
            const response = await fetch('http://localhost:3000/test')
                .then((data) => data.json())
            setResponse(response)
        })()
    }, [])

    console.log(response)

    return (
        <div>
            <pre>{JSON.stringify(response, null, 5)}</pre>
        </div>
    )
}

export default Test
