import Head from 'next/head'
import { InputLabels } from './index'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

import { useState } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'


export default function Login() {

    const router = useRouter()
    const [value, setValue] = useState({})
    const [error, setError] = useState(false)

    async function onClickHandle() {

        try {
            const response = await axios({
                method: 'POST',
                url: 'https://coasthub-apis.herokuapp.com/auth',
                data: value
            })
            
            setCookie(null, 'token', response.data.token, {
                maxAge: 896400,
                path: '/'
            })

            router.push('/dashboard')
        }
        catch (e) {
            setError(true)
        }      
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-purple-200">
            <Head>
                <title>CoastHub</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex px-96 flex-col items-center justify-center w-full flex-1 space-y-6 text-center">
                <LoginForm data={{ value: value, function: setValue }}/>
                {error && <h2 className="text-red-800">A senha ou e-mail incorreto</h2>}
                <button onClick={onClickHandle} className="bg-purple-400 w-full rounded-md py-2">Entrar</button>
            </main>

        </div>
    )
}

function LoginForm({ data }) {

    return (
        <div className="w-full space-y-4">
            <InputLabels id="email" data={data} type="email">
                E-mail
            </InputLabels>
            <InputLabels id="password" data={data} type="password">
                Senha
            </InputLabels>
        </div>
    )
}