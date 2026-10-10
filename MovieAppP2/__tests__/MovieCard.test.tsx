```tsx
import { render, fireEvent } from '@testing-library/react-native'
import MovieCard from '../components/MovieCard'

const movie = {
  id: 1,
  title: 'Avengers',
  genre: 'Hành động',
  year: 2024,
  rating: 8,
  poster: 'https://example.com/movie.jpg',
  isShowing: true
}

describe('MovieCard', () => {

  // a. Test hiển thị tên phim và điểm
  it('hiển thị tên phim và rating đúng định dạng', () => {
    const { getByText } = render(
      <MovieCard
        movie={movie}
        layout="row"
        onSelect={jest.fn()}
      />
    )

    expect(getByText('Avengers')).toBeTruthy()
    expect(getByText('⭐8.0')).toBeTruthy()
  })

  // b. Test layout
  it('row hiển thị thể loại', () => {
    const { getByText } = render(
      <MovieCard
        movie={movie}
        layout="row"
        onSelect={jest.fn()}
      />
    )

    expect(getByText('Hành động')).toBeTruthy()
  })

  it('tile không hiển thị thể loại', () => {
    const { queryByText } = render(
      <MovieCard
        movie={movie}
        layout="tile"
        onSelect={jest.fn()}
      />
    )

    expect(queryByText('Hành động')).toBeNull()
  })

  // c. Test trạng thái
  it('isShowing true hiển thị dấu tích', () => {
    const { getByText } = render(
      <MovieCard
        movie={{ ...movie, isShowing: true }}
        layout="row"
        onSelect={jest.fn()}
      />
    )

    expect(getByText('✅')).toBeTruthy()
  })

  it('isShowing false hiển thị dấu X', () => {
    const { getByText } = render(
      <MovieCard
        movie={{ ...movie, isShowing: false }}
        layout="row"
        onSelect={jest.fn()}
      />
    )

    expect(getByText('❌')).toBeTruthy()
  })

  // d. Test sự kiện bấm
  it('bấm vào phim gọi onSelect đúng 1 lần với id', () => {
    const onSelect = jest.fn()

    const { getByText } = render(
      <MovieCard
        movie={movie}
        layout="row"
        onSelect={onSelect}
      />
    )

    fireEvent.press(getByText('Avengers'))

    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith('1')
  })

})
```
