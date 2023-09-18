import { FiUser, FiLogOut } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import { Container, User } from './styles';

export function Header() {
    const { signOut, user } = useAuth();

    return (
        <Container>
            <h1>Menu</h1>

            <aside>
                <User>
                    <span>Olá, <strong>{user.name}</strong></span>
                    <small>
                    {/*CharAt(0) = recupera o caractere da posição indicada, slice(1) = 'corta' a string a partir da posição indicada */}
                        <FiUser /> Perfil de {(user.role).charAt(0).toUpperCase()+(user.role).slice(1)} 
                    </small>
                </User>
            </aside>

            <button type="button" onClick={signOut}>
                <FiLogOut size={24} />
            </button>
        </Container>
    );
};