import React from 'react'
import { Characters } from '@/types';
import Image from 'next/image';
import ImageLoader from '@/ImageLoader';
import { GetServerSideProps } from 'next';

const CharacterPage = ({ character }: { character: Characters }) => {
    return (
        <div>
            <h1>{character.name}</h1>
            <Image
                loader={ImageLoader}
                unoptimized
                src={character.image}
                alt={character.name}
                width="200"
                height="200"
            />
        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${context.query.id}`);
    const character = await res.json();
    return {
        props: {
            character
        }
    }
}
export default CharacterPage