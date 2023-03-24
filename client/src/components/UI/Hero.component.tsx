import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

const WrapBanner = styled("div")`
	background: #f75b5b;
	width: 100%;
`;

const Banner = styled("div")`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	@media (max-width: 768px) {
    	flex-direction: column;
  	}
`;

const Copy = styled("div")`
	width: 50%;

	@media (max-width: 768px) {
    	width: 90%;
		margin-top: 15px;
  	}

	& > h2 {
		font-size: 50px;
    	font-weight: 100;
		line-height: 42px;

		span {
			color: white;
		}
	}

	p {
		color: white;
	}
`

const HeroFigure = styled("div")`

	 img {
		width: 100%;
	}

`


const HeroBannerComponent = () => {
	return (
		<WrapBanner>
			<Container>
				<Banner>
					<Copy>
						<h2>
							Nike Air with <span>30%</span>
						</h2>
						<h2>
							discount!
						</h2>
						<p>
							Meet the shoes perfect suit to active lifestyle!
							Your feet won’t feel any fatigue!
						</p>
					</Copy>
					<HeroFigure>
						<img src={"/img/bg02.webp"} alt={'hero banner'} />
					</HeroFigure>
				</Banner>
			</Container>
		</WrapBanner>
	);
}

export default HeroBannerComponent;