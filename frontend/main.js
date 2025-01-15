const createMovie = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const movie = {
        name: formData.get('name'),
        description: formData.get('description'),
        type: formData.get('type'),
        category: formData.get('category'),
        rating: parseFloat(formData.get('rating')),
        imageUrl: formData.get('imageUrl')
    };

    try {
        const response = await fetch('http://localhost:3000/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });

        if (!response.ok) throw new Error('Failed to create movie');

        event.target.reset();
        closeAddForm();
        renderMovies();
    } catch (error) {
        console.error('Error creating movie:', error);
    }
};

const deleteMovie = async (id) => {
    if (!confirm('Are you sure you want to delete this movie?')) return;

    try {
        const response = await fetch(`http://localhost:3000/movies/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete movie');

        renderMovies();
    } catch (error) {
        console.error('Error deleting movie:', error);
    }
};


