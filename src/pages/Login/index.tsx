import { MdAdd } from 'react-icons/md';

export default function Login(): JSX.Element {
    return (
        <>
            <div className="min-h-full grid place-items-center bg-gradient-to-tl from-primary-100 to-primary-50" >
                <div className='flex flex-col gap-10 items-center sm:flex-row'>
                    <img
                        className="w-80 lg:w-96 xl:w-[713px] object-contain"
                        src={"/imagens/picture.png"}
                        alt="logo"
                    />

                    <div className="w-full h-fit max-w-sm lg:w-96">
                        <div className='flex'>
                            <h1 className='text-primary-900 font-bold text-4xl'>Gerência de Projetos</h1>
                            <MdAdd className="scale-150 text-primary-900" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
