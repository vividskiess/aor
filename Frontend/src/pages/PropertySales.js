import React, { useState, useEffect} from 'react'
import { Container, Pagination, Typography, Box, CircularProgress } from '@mui/material'
import axios from 'axios'
import PropertyCard from '../components/PropertyCard'
import smallPlaceholder from '../assets/smallPlaceholder.png'

export default function PropertySales() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 64;
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetchProperties(page)
  }, [page])

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
                    return { ...property, image: image || smallPlaceholder };
                } catch (error) {
                    console.error("Error fetching image for property:", error)
                    return { ...property, image: smallPlaceholder };
                }
            })
        );
        setProperties(propertiesWithImages);
        setTotalPages(Math.round(response.data.total / 64))
    } catch (err) {
        setError('Failed to load properties. Please try again.')
    } finally {
        setLoading(false)
    }
};

  const handlePageChange = (event, value) => {
      setPage(value)
  }

  const getStreetViewImage = (lat, lng) => {
    const APIKEY = process.env.REACT_APP_GOOGLE_API_KEY
    const STREET_VIEW_API_URL = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${lat},${lng}&key=${APIKEY}`;
    return STREET_VIEW_API_URL
}

  return (
    <Container disableGutters sx={{ py: { xs: 1, md: 4, lg: 6 }, px: { xs: 1, md: 2, lg: 4 }}}>
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
						<Typography
							variant="body"
							sx={{
								fontFamily: 'monospace',
								fontWeight: 700,
								color: 'inherit',
								textDecoration: 'none',
								fontSize: { xs: 20, md: 34 },
							}}
						>
							View Properties Sold
						</Typography>
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
							justifyContent: 'center',
							alignItems: 'center',
							flexWrap: 'wrap',
							gap: { xs: 2, md: '20px 80px', lg: '20px, 60px' },
						}}
					>
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
