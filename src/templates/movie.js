import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import {Wrapper, Image} from './templateStyles/movieStyles'

const Movie = ({data}) => {
    console.log(data)
    return (
        <div>
            Hello
        </div>
    )
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