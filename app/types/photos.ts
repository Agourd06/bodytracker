export interface PhotoEntry {
  id: string;  
  uri: string; 
  date: string; 
  week: number; 
  filtered?: boolean;
  filters?: {
    brightness?: number;   
    contrast?: number;     
    blackAndWhite?: boolean; 
  };
}
