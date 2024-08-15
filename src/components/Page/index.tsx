import Loading from '../Loading';

export default function Page({ children, loading }: { children: JSX.Element | JSX.Element[] | string[] | string, loading: boolean }) {
    return (
        <>
            {loading ? <Loading /> : children}
        </>
    )
}
