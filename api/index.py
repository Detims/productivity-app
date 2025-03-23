from flask import Flask
import datetime

x = datetime.datetime.now()

app = Flask(__name__)

@app.route('/data')
def get_time():
    return {
        'Name':'gook',
        'Age':'21',
        'Date':x,
        'programming':'nothing'
    }

if __name__ == '__main__':
    app.run(debug=True)