from contextlib import asynccontextmanager
from datetime import datetime, timedelta
from typing import AsyncIterator

from fastapi import FastAPI, Form, status
from fastapi.responses import RedirectResponse
from typing_extensions import TypedDict

from services.database import JSONDatabase


class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Handle database management when running app."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []

    yield

    database.close()


app = FastAPI(lifespan=lifespan)


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> RedirectResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now()
    quote = Quote(name=name, message=message, time=now.isoformat(timespec="seconds"))
    database["quotes"].append(quote)

    # You may modify the return value as needed to support other functionality
    return RedirectResponse("/", status.HTTP_303_SEE_OTHER)


# TODO: add another API route with a query parameter to retrieve quotes based on max age
@app.get("/quote")
async def get_quotes(age: int = None) -> list[Quote]:
    if age is None:
        return database["quotes"]                #if get_quotes is called with no argument, you receive all quotes
    now = datetime.now()
    quoteExpiry = now - timedelta(days = age)
    quoteList =  []
    for quote in database["quotes"]:
        if quote["time"] > quoteExpiry:
            quoteList.append(quote)
    return quoteList