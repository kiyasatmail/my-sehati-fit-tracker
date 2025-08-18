import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, Package, Trash2, CheckCircle, XCircle } from 'lucide-react';

interface WorkoutItem {
  id: string;
  name: string;
  icon: string;
  checked: boolean;
  category: 'before' | 'after';
}

const availableIcons = [
  { icon: '🧴', label: 'Bottle' },
  { icon: '👟', label: 'Shoes' },
  { icon: '🎧', label: 'Headphones' },
  { icon: '🏃', label: 'Running' },
  { icon: '💧', label: 'Water' },
  { icon: '🧽', label: 'Towel' },
  { icon: '🎒', label: 'Bag' },
  { icon: '💳', label: 'Card' },
  { icon: '🔑', label: 'Keys' },
  { icon: '📱', label: 'Phone' },
  { icon: '⌚', label: 'Watch' },
  { icon: '🧤', label: 'Gloves' },
  { icon: '🩳', label: 'Shorts' },
  { icon: '👕', label: 'Shirt' },
  { icon: '🥤', label: 'Drink' },
  { icon: '💊', label: 'Supplements' }
];

export const MyItems: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [items, setItems] = useState<WorkoutItem[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('🎒');
  const [selectedCategory, setSelectedCategory] = useState<'before' | 'after'>('before');

  // Load items from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem('sehati-workout-items');
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (error) {
        console.error('Error loading items:', error);
      }
    }
  }, []);

  // Save items to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('sehati-workout-items', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!newItemName.trim()) return;

    const newItem: WorkoutItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      icon: selectedIcon,
      checked: false,
      category: selectedCategory
    };

    setItems(prev => [...prev, newItem]);
    setNewItemName('');
    setSelectedIcon('🎒');
    setIsAddDialogOpen(false);
    
    toast({
      title: t('add'),
      description: `${newItem.icon} ${newItem.name} ${t('add')}`,
    });
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: t('delete'),
      description: t('delete'),
    });
  };

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const checkAllItems = (category: 'before' | 'after') => {
    setItems(prev => prev.map(item => 
      item.category === category ? { ...item, checked: true } : item
    ));
  };

  const uncheckAllItems = (category: 'before' | 'after') => {
    setItems(prev => prev.map(item => 
      item.category === category ? { ...item, checked: false } : item
    ));
  };

  const getItemsByCategory = (category: 'before' | 'after') => {
    return items.filter(item => item.category === category);
  };

  const renderItemsList = (category: 'before' | 'after') => {
    const categoryItems = getItemsByCategory(category);
    
    if (categoryItems.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">{t('noItemsYet')}</p>
          <p className="text-sm">{t('addFirstItem')}</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => checkAllItems(category)}
            className="flex items-center gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            {t('checkAll')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => uncheckAllItems(category)}
            className="flex items-center gap-2"
          >
            <XCircle className="h-4 w-4" />
            {t('uncheckAll')}
          </Button>
        </div>
        
        {categoryItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
              item.checked ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <Checkbox
                checked={item.checked}
                onCheckedChange={() => toggleItem(item.id)}
                className="h-5 w-5"
              />
              <span className="text-2xl">{item.icon}</span>
              <span className={`font-medium ${item.checked ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                {item.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {item.checked && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  ✓
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteItem(item.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <Package className="h-8 w-8 text-pink-500" />
          {t('myItems')}
        </h1>
        <p className="text-gray-600">{t('myItemsDesc')}</p>
      </div>

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full gradient-primary hover:gradient-secondary text-white transition-smooth">
            <Plus className="h-4 w-4 mr-2" />
            {t('addNewItem')}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('addNewItem')}</DialogTitle>
            <DialogDescription>
              {t('myItemsDesc')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t('itemName')}</label>
              <Input
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder={t('itemName')}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">{t('selectIcon')}</label>
              <div className="grid grid-cols-8 gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg">
                {availableIcons.map((iconItem) => (
                  <button
                    key={iconItem.icon}
                    onClick={() => setSelectedIcon(iconItem.icon)}
                    className={`p-2 text-2xl rounded hover:bg-gray-100 transition-colors ${
                      selectedIcon === iconItem.icon ? 'bg-pink-100 ring-2 ring-pink-500' : ''
                    }`}
                  >
                    {iconItem.icon}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Tabs value={selectedCategory} onValueChange={(value: any) => setSelectedCategory(value)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="before">{t('beforeWorkout')}</TabsTrigger>
                  <TabsTrigger value="after">{t('afterWorkout')}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {t('cancel')}
            </Button>
            <Button 
              onClick={addItem}
              disabled={!newItemName.trim()}
              className="gradient-primary hover:gradient-secondary transition-smooth"
            >
              {t('add')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Items Tabs */}
      <Tabs defaultValue="before" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="before" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            {t('beforeWorkout')}
          </TabsTrigger>
          <TabsTrigger value="after" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            {t('afterWorkout')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="before">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-green-700">
                {t('beforeWorkout')}
              </CardTitle>
              <CardDescription>
                تأكد من جميع أغراضك قبل الذهاب للتمرين
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderItemsList('before')}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="after">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-blue-700">
                {t('afterWorkout')}
              </CardTitle>
              <CardDescription>
                تأكد من استرداد جميع أغراضك بعد التمرين
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderItemsList('after')}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('beforeWorkout')}</p>
                <p className="text-2xl font-bold text-green-600">
                  {getItemsByCategory('before').filter(item => item.checked).length}/{getItemsByCategory('before').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('afterWorkout')}</p>
                <p className="text-2xl font-bold text-blue-600">
                  {getItemsByCategory('after').filter(item => item.checked).length}/{getItemsByCategory('after').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};