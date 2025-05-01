import { createContext, useState, useContext, useEffect } from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")

        if (storedFavs) setFavorites(JSON.parse(storedFavs))
    }, [])

    const updateLocalStorage = (updatedStorage) => {
        localStorage.setItem('favorites', JSON.stringify(updatedStorage))
    }

    const addToFavorites = (movie) => {
        const modifiedFavorites = [...favorites, movie]
        updateLocalStorage(modifiedFavorites)
        setFavorites(modifiedFavorites)
    }

    const removeFromFavorites = (movieId) => {
        const modifiedFavorites = favorites.filter(movie => movie.id !== movieId)
        updateLocalStorage(modifiedFavorites)
        setFavorites(modifiedFavorites)
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}