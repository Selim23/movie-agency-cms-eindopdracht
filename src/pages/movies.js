import React from "react"
import {useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {Wrapper, Image, Artist, BottomEdgeDown, BottomEdgeUp} from "./pageStyles/pageStyles"
import { COLORS } from "../constants"

const MoviePage = () => {
    const {
        wpcontent:{
            page:{ moviesPageMeta:{
                moviesPageKleineBeschrijving,
                moviesPageBannerFoto,
            },
            },
            movies:{
                edges: movies
            },
        },
    } = useStaticQuery(graphql`
    query {
        wpcontent {
          page(id: "movies", idType: URI) {
            moviesPageMeta {
              moviesPageKleineBeschrijving
              moviesPageBannerFoto {
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
          movies {
            edges {
              node {
                film {
                  beschrijving
                  hoofdpersonage
                  naam
                  releasejaar
                  image{
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
        }
      }
      
    `)
    console.log(movies)
return<Layout>
    <SEO title="Movies"/>
    <Wrapper artistsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY} >
        <div className="banner">
           <Image fluid={moviesPageBannerFoto.imageFile.childImageSharp.fluid} alt={moviesPageBannerFoto.altText} /> 
           <BottomEdgeDown color={COLORS.SECONDARY} />
        </div>
        <div className="description" >
            <h2>We are Movie Lovers!</h2>
            <p>{moviesPageKleineBeschrijving}</p>
            <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="artists">
            <h2>Favorite Films</h2>
            <div className="artist-items">
                {movies.map(({node: {film, slug} }) => (
                    <Artist to={`/${slug}`} key={slug} >
                        <Image fluid={film.image.imageFile.childImageSharp.fluid} alt={movies.altText} ></Image>
                        <div className="artist-info">
                            <p>{film.naam}</p>
                            <p>{film.releasejaar}</p>
                        </div>
                    </Artist>
                ))}
            </div>
        </div>
    </Wrapper>
</Layout>
}

export default MoviePage