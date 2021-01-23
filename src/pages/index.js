import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {Wrapper, Image, Artist, BottomEdgeDown, BottomEdgeUp} from "./pageStyles/pageStyles"
import {COLORS} from '../constants'

const IndexPage = () => {
  const {
    wpcontent: {
      page:{
        homePageMeta: {
          homePageBannerFoto,
          homePageDescription,
          homePageFeaturedMovies,
          homePageTitle,
          
        },
      },
    },
  } = useStaticQuery(graphql`
  query{
    wpcontent {
      page(id: "home", idType: URI) {
        homePageMeta {
          homePageBannerFoto {
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
          homePageDescription
          homePageFeaturedMovies {
            ... on WPGraphql_Movie {
              id
              slug
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
                      fluid(quality: 100, grayscale: true){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
              }
            }
          }
          homePageTitle
        }
      }
    }
  }
  `)
  return(
    <Layout>
    <SEO title="Home" />
    <Wrapper>
    <div className="banner">
      <Image
            fluid={homePageBannerFoto.imageFile.childImageSharp.fluid}
            alt={homePageBannerFoto.altText}
          />
          <div className="inner-div">
            <p className="header-title">{homePageTitle}</p>
            <p className="header-description">{homePageDescription}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK} />
        </div>
        <div className="artists">
        <h2>Featured Movies</h2>
          <div className="artist-items">
            {homePageFeaturedMovies.map(({film, slug}) =>(
              <Artist to={`/${slug}`}>
                <Image fluid={film.image.imageFile.childImageSharp.fluid} altText={film.altText} />
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
  )
}

export default IndexPage
