import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '../../../components/Icon';
import { ItemMenu } from '../../../types/menu.d';
import classNames from '../../../utils/classNames';

export default function MenuItem({ props }: { props: ItemMenu }) {
    const Link = ({ item }: { item: ItemMenu }) => {
        return (
            (
                <RouterLink to={item.link || ""}
                    className={classNames(
                        'group flex items-center justify-center gap-2 px-2 py-2 text-base font-medium rounded-md w-full mb-1',
                        item.ativo ? 'bg-primary-800 text-white' : ' bg-primary-800/20 text-gray-100 hover:bg-primary-800 hover:text-white'
                    )}
                >
                    {item.icone && <Icone icone={item.icone} ativo={!!item.ativo} />}
                    <div className='flex-1 flex flex-row justify-between items-center'>
                        <Descricao descricao={item.descricao} />
                    </div>
                </RouterLink>
            )
        )
    }


    const Descricao = ({ descricao }: { descricao: string }) => {
        return <span className='flex-1 text-left'>{descricao}</span>
    }

    const Icone = ({ icone, ativo }: { icone: string, ativo: boolean }) => {
        return (
            <div className='flex flex-col items-center'>
                <Icon
                    icon={icone}
                    outline={!ativo}
                    className={classNames(
                        ativo ? 'text-white' : 'text-gray-100 group-hover:text-white',
                        'flex-shrink-0 h-4 w-4'
                    )}
                />
            </div>
        )
    }

    return (
        <>
            <Link item={props} />
        </>
    )
}