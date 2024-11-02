import React, { useState, useEffect} from 'react'
import { Stack, Container, Pagination, Typography, Box, CircularProgress } from '@mui/material'
import axios from 'axios'
import PropertyCard from '../components/PropertyCard'
import smallPlaceholder from '../assets/smallPlaceholder.png'

export default function PropertySales() {
  // holds data from API call
  const [properties, setProperties] = useState([])
  // handles if code should show loading 
  const [loading, setLoading] = useState(false)
  // error handler
  const [error, setError] = useState('')
  // pagination handler
  const [page, setPage] = useState(1)
  // declare how many <PropertyCard /> is shown on one page at anytime
  const pageSize = 63;
  // holds the amount of data entries in CSV
  const [totalPages, setTotalPages] = useState(0)

  // Fetch data when component mounts
  useEffect(() => {
    fetchProperties(page)
  }, [page])

  // function that works similarly to the fetch reqeust in Home.js
  // API responds with two different data points: 
    // data.total (returns in integer of the total amount of entries in the .csv)
    // data.items (the actual data records )
  // these are then stored in their respective useState variables.
  const fetchProperties = async (page) => {
    setLoading(true)
    setError('')
    try {
        const response = await axios.get(`http://localhost:8000/properties`, {
            params: { page, page_size: pageSize }
        });
        console.log("API Response:", response.data)
        console.log("Total Pages:", response.data.total)
        const propertiesWithImages = await Promise.all(
          response.data.items.map(async (property) => {
            try {
                const image = await getStreetViewImage(property.Lattitude, property.Longtitude);
                return { ...property, image: image || smallPlaceholder }
            } catch (error) {
                console.error("Error fetching image for property:", error)
                return { ...property, image: smallPlaceholder }
            }
          })
        )
        setProperties(propertiesWithImages)

        // divide total amount of entries / 64 to get number of pages
        setTotalPages(Math.round(response.data.total / 64))
    } catch (err) {
        setError('Failed to load properties. Please try again.')
    } finally {
        setLoading(false)
    }
}

  const handlePageChange = (event, value) => {
      setPage(value)
  }

  // helper function that uses Google Maps API to fetch street view images
  const getStreetViewImage = (lat, lng) => {
    const APIKEY = process.env.REACT_APP_GOOGLE_API_KEY
    const STREET_VIEW_API_URL = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${lat},${lng}&key=${APIKEY}`;
    return STREET_VIEW_API_URL
}

  return (
    <Container disableGutters sx={{ py: { xs: 2, md: 4, lg: 6 }, px: { xs: 2, md: 4, lg: 4 } }}>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <Box>
					<Box sx={{ mb: 8 }}>
						<Box>
							<Box sx={{
								mb: 1, 
								width: '150px',
								height: '4px',
								background: 'linear-gradient(90deg, rgba(18,85,255,1) 0%, rgba(0,0,0,0.8) 100%)'
								}}
							/>
						</Box>
            <Stack direction="column" sx={{marginBottom: 4}}>
              <Typography
                variant="body"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  fontSize: { xs: 20, md: 34 },
                }}
              >
                Sold Properties
              </Typography>

              <Typography
                variant="p"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 400,
                  fontSize: { xs: 14, md: 20 },
                }}
              >
                Search for houses that were recently sold  
              </Typography>
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
              <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
              />
            </Box>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							flexWrap: 'wrap',
							gap: { xs: 2 },
						}}
					>
            {/* renders PropertyCard /> component where each data point in the array is passed down as props */}
						{
							properties.map((item, i) => {
								return (
									<PropertyCard property={item} key={i}/>
							)})
						}
					</Box>
				</Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
          />
      </Box>
    </Container>
  );
}
