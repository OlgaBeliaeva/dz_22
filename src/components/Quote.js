import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomQuote } from '../features/quote/quoteSlice';
import styles from './Quote.module.css';

const Quote = () => {
    const dispatch = useDispatch();
    const quote = useSelector((state) => state.quote.quote);
    const author = useSelector((state) => state.quote.author);
    const quoteStatus = useSelector((state) => state.quote.status);
    const error = useSelector((state) => state.quote.error);

    useEffect(() => {
        if (quoteStatus === 'idle') {
            dispatch(fetchRandomQuote());
        }
    }, [quoteStatus, dispatch]);

    const handleNewQuote = () => {
        dispatch(fetchRandomQuote());
    };

    return (
        <div className={styles.quoteContainer}>
            {quoteStatus === 'loading' && <p>Loading...</p>}
            {quoteStatus === 'succeeded' && (
                <>
                    <p className={styles.quote}>“{quote}”</p>
                    <p className={styles.author}>- {author}</p>
                </>
            )}
            {quoteStatus === 'failed' && <p>Error: {error ? error : "An unknown error occurred"}</p>}
            <button onClick={handleNewQuote} className={styles.newQuoteButton}>
                New Quote
            </button>
        </div>
    );
};

export default Quote;