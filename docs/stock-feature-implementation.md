# Stock Feature Implementation Guide

## Database Schema Design
```mermaid
erDiagram
    USERS ||--o{ PORTFOLIOS : "has"
    USERS {
        uuid id PK
        string username
        string hashed_password
        timestamp created_at
    }
    
    STOCKS {
        string symbol PK
        string name
        string sector
        integer ai_impact_score
    }
    
    PORTFOLIOS {
        uuid id PK
        uuid user_id FK
        string stock_symbol FK
        integer shares
        decimal cost_basis
    }
    
    TRADES {
        uuid trade_id PK
        uuid user_id FK
        string stock_symbol FK
        integer shares
        decimal trade_price
        timestamp executed_at
    }
```

## API Endpoints
```mermaid
graph TD
    Auth[/auth/*] --> Login[/login]
    Auth --> Signup[/signup]
    Stocks[/stocks/*] --> List[/]
    Stocks --> Detail[/:symbol]
    Portfolio[/portfolio/*] --> Holdings[/]
    Portfolio --> History[/history]
```

## Frontend Component Architecture
```tsx
// Example StockCard component integration
interface StockCardProps {
  symbol: string;
  price: number;
  impactScore: number;
  onChange: (newScore: number) => void;
}

const StockCard: React.FC<StockCardProps> = ({ symbol, price, impactScore }) => (
  <div className="stock-card">
    <div className="header">
      <h3>{symbol}</h3>
      <span className={`score ${impactScore > 0 ? 'positive' : 'negative'}`}>
        {impactScore}
      </span>
    </div>
    <div className="price">${price.toFixed(2)}</div>
  </div>
);
```

## AI Integration Flow
```mermaid
sequenceDiagram
    Frontend->>Backend: GET /ai-score?symbol=AAPL
    Backend->>Cache: Check cached score
    alt Cached score exists
        Cache-->>Backend: Return score
    else
        Backend->>AlphaVantage: Get company overview
        Backend->>OpenAI: Analyze text
        OpenAI-->>Backend: AI assessment
        Backend->>Cache: Store result
    end
    Backend-->>Frontend: Return AI score
```

## Testing Strategy
```mermaid
graph TD
    A[Unit Tests] --> B[API Controllers]
    A --> C[AI Scoring Logic]
    D[E2E Tests] --> E[Trade Execution Flow]
    D --> F[Portfolio Updates]
    G[Mock Server] --> H[AlphaVantage API]
```

## Environment Setup
```bash
# Required .env variables
ALPHA_VANTAGE_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
DB_HOST=localhost
DB_NAME=nerdy_stocks