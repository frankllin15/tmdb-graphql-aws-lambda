const { Media, FullMedia, Peaple } = require('../models')

const BASE_API = "https://api.themoviedb.org/3"
const API_KEY = "6f973dec3cd89007e8bbd8db4072c460"

 const resolvers = {
    Query: {

        media: async ({_, id, media_type }) => {
            try {

                const [data, cast] = await Promise.all([
                    fetch(`${BASE_API}/${media_type}/${id}?api_key=${API_KEY}&include_media_type=true&language=pt-BR&append_to_response=external_ids`)
                        .then(resp => resp.json()),
                    fetch(`${BASE_API}/${media_type}/${id}/credits?api_key=${API_KEY}&language=pt-BR`)
                        .then(resp => resp.json())
                        .then(({ cast })=> cast)
                ])

                return new FullMedia(data, cast, media_type)

            } catch (error) {

                throw error

            }
        },
        trendingMedia: async ({_, media_type }) => {

            try {

                const resp = await fetch(`${BASE_API}/trending/${media_type}/week?api_key=${API_KEY}&language=pt-BR`)
                const json = (await resp.json()).results

                return await json.map(e => new Media(e, media_type))

            } catch (error) {
                throw error
            }

        },
        mediaRecommendations: async ({_, media_type, id }) => {

            try {
                const resp = await fetch(`${BASE_API}/${media_type}/${id}/recommendations?api_key=${API_KEY}&language=pt-BR`)
                const json = (await resp.json()).results

                return await json.map(e => new Media(e, media_type))

            } catch (error) {

                throw error

            }
        },
        mediaByGenre: async ({_, media_type, genre_id, page, period }) => {

            try {

                const resp = await fetch(`${BASE_API}/discover/${media_type}?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_genres=${genre_id}${(period && media_type == "movie" ? "&primary_release_year=" : "&first_air_date_year=") + period}`)
                const json = await resp.json()
                const results = (await json.results).map(e => new Media(e, media_type))

                return {
                    results,
                    total_pages: json.total_pages

                }
            } catch (error) {

                throw error

            }
        },
        topRatedTmdb: async ({_, media_type, page }) => {

            try {

                const resp = await fetch(`${BASE_API}/${media_type}/top_rated?api_key=${API_KEY}&language=pt-BR&page=${page}`)
                const json = await resp.json()
                const results = (await json).results.map(e => new Media(e, media_type))

                return {
                    results,
                    total_pages: json.total_pages
                }


            } catch (error) {

                throw error

            }

        },
        releaseMovies: async ({_, page }) => {
            try {

                const resp = await fetch(`${BASE_API}/movie/now_playing?api_key=${API_KEY}&language=pt-BR&page=${page}`)
                const json = await resp.json()

                const results = (await json).results.map(e => new Media(e, "movie"))

                return {
                    results,
                    total_pages: json.total_pages
                }


            } catch (error) {

                throw error

            }

        },
        peaple: async ({_, id }) => {

            try {

                const resp = await fetch(`${BASE_API}/person/${id}?api_key=${API_KEY}&language=pt-BR`)
                const json = await resp.json()

                const peaple = new Peaple(json)

                return peaple

            } catch (error) {

                throw error

            }
        },
        artWorks: async ({_, id, media_type, page }) => {

            try {

                page = Number(page) - 1

                const resp = await fetch(`${BASE_API}/person/${id}/${media_type}_credits?api_key=${API_KEY}&language=pt-BR`)
                const json = await resp.json()
                const cast = await json.cast

                const results = await cast.filter((e, id) => id >= page * 20 && id <= (page + 1) * 20 - 1)
                    .map(e => new Media(e, media_type))

                return {
                    results,
                    total_pages: Math.floor(cast.length / 20) || 1
                }
            } catch (error) {

                throw error

            }

        },
        mediaVideos: async ({_, id, media_type }) => {

            try {

                const resp = await fetch(`${BASE_API}/${media_type}/${id}/videos?api_key=${API_KEY}&language=pt-BR&append_to_response=videos`)
                const json = await resp.json()

                const results = (await json).results
                    .map(e => ({
                        key: e.key,
                        name: e.name,
                        site: e.site
                    }))

                return results


            } catch (error) {

                throw error

            }
        },
        similarMedia: async ({_, id, media_type }) => {

            try {

                const resp = await fetch(`${BASE_API}/${media_type}/${id}/similar?api_key=${API_KEY}&language=pt-BR&page=1`)
                const json = await resp.json()

                const results = (await json).results
                    .map(e => new Media(e, media_type))

                return results

            } catch (error) {

                throw error 

            }
        }
    }
};

module.exports = resolvers
