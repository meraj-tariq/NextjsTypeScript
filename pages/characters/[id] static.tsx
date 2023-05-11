import React from 'react'
import ImageLoader from '@/ImageLoader';
import { Characters, GetCharactersResults } from '@/types';
import Image from 'next/image';

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

export async function getStaticPaths() {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const { results }: GetCharactersResults = await res.json();

    return {
        paths: results.map((charaters) => {
            return { params: { id: String(charaters.id) } }
        }),
        fallback: false
    };
}

export async function getStaticProps({ params }: { params: { id: String } }) {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`);
    const character = await res.json();
    return {
        props: {
            character
        }
    }
}
export default CharacterPage