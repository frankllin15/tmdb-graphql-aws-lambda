class Cast {
    constructor(e) {
        
        this.id= e.id
        this.name= e.name
        this.profile_path= e.profile_path
    }
}
class Media {
    constructor (data, media_type) {

        this.id = data.id
        this.name = data.title || data.name
        this.poster_path = data.poster_path
        this.media_type = media_type
        this.backdrop_path = data.backdrop_path
        this.vote_average = data.vote_average
    }
}
class FullMedia extends Media {
    constructor(data, cast = [], media_type) {

        super(data, media_type)

        this.imdb_id = data.imdb_id || data.external_ids.imdb_id
        this.release_date = data.release_date || data.first_air_date
        this.runtime = data.runtime || null
        this.genres = data.genres
        this.overview = data.overview
        this.media_type
        this.cast =  cast.filter((_, id) => id < 4)
                        .map(e => new Cast(e))
    }
}
class Peaple {
    constructor (data) {
        this.id = data.id
        this.name = data.name
        this.profile_path = data.profile_path
        this.known_for_department = data.known_for_department
        this.place_of_birth = data.place_of_birth
        this.birthday = data.birthday
        this.biography = data.biography
    }
}

module.exports = { Cast, FullMedia, Media, Peaple }