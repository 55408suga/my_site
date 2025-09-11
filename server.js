const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const gyms = [
    {
        id: 1,
        name: 'ボルダリングジム Speedy',
        description: '東戸塚駅近くのアットホームなジム。本物の外岩感覚で登れる「白鯨ボルダー」が特徴。',
        website: 'http://xx-speedy.com',
        price: '学生料金 1,500円〜',
        googleMapEmbed: 'https://www.google.com/maps/embed/v1/place?q=%E3%80%92244-0801%20%E7%A5%9E%E5%A5%88%E5%B7%9D%E7%9C%8C%E6%A8%AA%E6%B5%9C%E5%B8%82%E6%88%B8%E5%A1%9A%E5%8C%BA%E5%93%81%E6%BF%83%E7%94%BA554-5',
        googleRating: '評価なし'
    },
    {
        id: 2,
        name: 'ディーボルダリング横浜綱島',
        description: '綱島駅から徒歩2分。シャワールームやドリンクバーも完備。',
        website: 'https://d-b-c.jp/yokohama/tsunashima/',
        price: '学生料金 1,650円',
        googleMapEmbed: 'https://www.google.com/maps/embed/v1/place?q=神奈川県横浜市港北区綱島西2-2-22',
        googleRating: '4.3 (151件のレビュー)'
    },
    {
        id: 3,
        name: 'MAMMUT ボルダリングジム横浜',
        description: 'みなとみらい線「日本大通り駅」から徒歩4分。',
        website: 'http://www.rockgym.jp/yokohama/',
        price: '1日 2,200円(男性)/1,760円(女性) (学生料金見当たらず)',
        googleMapEmbed: 'https://www.google.com/maps/embed/v1/place?q=神奈川県横浜市中区山下町22',
        googleRating: '4.1 (160件のレビュー)'
    },
    {
        id: 4,
        name: 'ボルダリングジムシェア',
        description: '京急線「鶴見市場駅」から徒歩6分。神奈川最大級の広さ。',
        website: 'https://www.boulderinggymshare.com/',
        price: '学生料金 1,650円',
        googleMapEmbed: 'https://www.google.com/maps/embed/v1/place?q=ボルダリングジムシェア 鶴見',
        googleRating: '4.4 (90件のレビュー)'
    },
    {
        id: 5,
        name: 'B-PUMP横浜店',
        description: '横浜駅から徒歩10分。予約不要で体験クライミングが可能。',
        website: 'https://pump-climbing.com/gym/bpump-yokohama/',
        price: '学生料金 1,650円 (平日)',
        googleMapEmbed: 'https://www.google.com/maps/embed/v1/place?q=B-PUMP横浜店',
        googleRating: '4.1 (159件のレビュー)'
    },
    {
        id: 6,
        name: 'クライミングジム プロジェクト',
        description: '横浜線「鴨居駅」から徒歩16分。',
        website: 'https://project-climbing.com/',
        price: '学生料金 1,700円',
        googleMapEmbed: 'https://www.google.com/maps/embed/v1/place?q=クライミングジム プロジェクト 鴨居 神奈川県横浜市都筑区佐江戸町417',
        googleRating: '4.5 (47件のレビュー)'
    },
    {
        id: 7,
        name: 'all fours GYM (現: Rock Spot)',
        description: '世界初の「四足教室専用レーン」があるジム。',
        website: 'http://allfoursgym.com/',
        price: '学生料金 1,400円 (大学生)',
        googleMapEmbed: 'https://maps.google.com/maps?q=神奈川県横浜市中区本牧原15-6 グロブナースクエア地下1階&output=embed',
        googleRating: '評価なし'
    },
    {
        id: 8,
        name: 'folk bouldering gym',
        description: '室内でボルダリングを楽しめるクライミングジム。',
        website: 'https://folkboulderinggym.com/',
        price: '学生料金 1,700円',
        googleMapEmbed: 'https://www.google.com/maps/embed/v1/place?q=folk+bouldering+gym+横浜市港北区新羽町576-1',
        googleRating: '4.3 (29件のレビュー)'
    },
    {
        id: 9,
        name: 'クライミングバム横浜店',
        description: '高さが怖い方でも楽しめるジム。',
        website: 'https://climbingbum.jp/yokohama/',
        price: '1日 1,800円 (学生料金見当たらず)',
        googleMapEmbed: 'https://www.google.com/maps/embed/v1/place?q=クライミングバム横浜店',
        googleRating: '4.0 (46件のレビュー)'
    }
];

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/bouldering', (req, res) => {
    res.render('bouldering', { gyms: gyms });
});

app.get('/gym/:id', (req, res) => {
    const gym = gyms.find(g => g.id === parseInt(req.params.id));
    if (!gym) {
        return res.status(404).send('Gym not found');
    }
    res.render('gym', { gym: gym });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});