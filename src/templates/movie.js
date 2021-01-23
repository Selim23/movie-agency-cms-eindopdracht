import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import {Wrapper, Image} from './templateStyles/movieStyles'

const Movie = ({
    data:{
        wpcontent:{
            movie:{
                film,
                genres:{ edges: genres}
            }
        }
    }
}) => {
    return <Layout>
        <SEO title ="Movie" />
        <Wrapper>
            <div className ="artist-container">
                <div className="artist-image">
                <Image fluid={film.image.imageFile.childImageSharp.fluid} alt={film.image.altText} />
                <div className="roles">
                    {genres.map(({node: genre}) => (
                        <div className="role">
                            {genre.name}
                        </div>
                    ))}
                </div>
                </div>
                <div className="artist-info">
                    <h2>{film.naam}</h2>
                    <h3><span>{film.releasejaar}</span> - <span>{film.hoofdpersonage}</span></h3>
                    <h3><span>{film.beschrijving}</span></h3>
                    <p className="info">
                        <strong className="description">Cast: </strong>{film.hoofdpersonage}
                    </p>
                    <p className="info">
                        <strong className="description">Release Date: </strong>{film.releasejaar}
                    </p>
                </div>
            </div>
        </Wrapper>
    </Layout>
    
}

export default Movie

export const pageQuery = graphql`
query ($id: ID!){
wpcontent {
    movie(id: $id, idType: ID) {
      genres {
        edges {
          node {
            name
          }
        }
      }
      film {
        beschrijving
        hoofdpersonage
        naam
        releasejaar
        image {
          altText
          sourceUrl
          imageFile {
          childImageSharp{
              fluid(quality: 100){
              ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
}
`