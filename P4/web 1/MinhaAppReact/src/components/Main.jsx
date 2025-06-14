import { Carousel, Container } from 'react-bootstrap';

function Main() {
  return (
    <Container className="my-3">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/8944071/pexels-photo-8944071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Primeira imagem"
          />
          <Carousel.Caption>
            <h3>Imagem 1</h3>
            <p>Descrição da imagem 1.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/29942539/pexels-photo-29942539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Segunda imagem"
          />
          <Carousel.Caption>
            <h3>Imagem 2</h3>
            <p>Descrição da imagem 2.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/32204469/pexels-photo-32204469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Terceira imagem"
          />
          <Carousel.Caption>
            <h3>Imagem 3</h3>
            <p>Descrição da imagem 3.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  )
  
}

export default Main;