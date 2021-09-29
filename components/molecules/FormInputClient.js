

export default function FormInputClient({ step, data }) {

    const defaultOptionsAnimation = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        renderSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return (
        <div>
            {step === 1 && (
                <div className="space-y-4">
                    <InputLabels data={data} id="email" type="email">
                        E-mail
                    </InputLabels>
                    <PaswordInputs data={data} />
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4">
                    <InputLabels id="firstName" data={data} type="text">
                        Nome
                    </InputLabels>
                    <InputLabels id="lastName" data={data} type="text">
                        Sobrenome
                    </InputLabels>
                    <InputLabels id="document" data={data} type="cpf">
                        CPF
                    </InputLabels>
                    <AdressInputs data={data} />
                </div>
            )}

            {step === 3 && (
                <div className="space-y-4">
                    <Lottie
                        height={250}
                        width={250}
                        options={defaultOptionsAnimation}
                    />
                    <h1 className="text-2xl text-justify">Enviamos um E-mail, por favor confirme sua conta para continuar.</h1>
                </div>
            )}
        </div>
    )
}