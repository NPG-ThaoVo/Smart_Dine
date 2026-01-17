import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Check, CheckCheck } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
const NotificationManagement = ({ 
  notifications = [], 
  loading = false,
  onMarkAsRead,
  onMarkAllAsRead
}) => {

  const getIcon = (iconType) => {
    switch (iconType) {
      case "clock":
        return <Clock className="w-4 h-4" />;
      case "users":
        return <Users className="w-4 h-4" />;
      case "check":
        return <Check className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Phân loại thông báo theo thời gian
  const categorizeNotifications = (filterUnread = false) => {
    const now = new Date();
    const categorized = { recent: [], today: [], yesterday: [], older: [] };

    // Kiểm tra notifications có phải array không
    if (!Array.isArray(notifications)) {
      return categorized;
    }

    // Lọc notifications nếu cần
    const notifList = filterUnread ? notifications.filter(n => n.status === 'UNREAD') : notifications;

    notifList.forEach(notif => {
      const createdAt = new Date(notif.createdAt);
      const diffMs = now - createdAt;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 60) {
        categorized.recent.push(notif);
      } else if (diffHours < 24) {
        categorized.today.push(notif);
      } else if (diffDays === 1) {
        categorized.yesterday.push(notif);
      } else {
        categorized.older.push(notif);
      }
    });

    return categorized;
  };

  const formatTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays === 1) return 'Hôm qua';
    return `${diffDays} ngày trước`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'NEW_ORDER':
        return { icon: 'clock', bg: 'bg-orange-500/10', color: 'text-orange-500' };
      case 'SERVICE_REQUEST':
        return { icon: 'users', bg: 'bg-red-500/10', color: 'text-red-500' };
      case 'FOOD_READY':
        return { icon: 'check', bg: 'bg-green-500/10', color: 'text-green-600' };
      default:
        return { icon: 'clock', bg: 'bg-gray-500/10', color: 'text-gray-500' };
    }
  };

  const categorizedNotifs = categorizeNotifications(false);
  const categorizedUnreadNotifs = categorizeNotifications(true);
  const unreadCount = Array.isArray(notifications) ? notifications.filter((n) => n.status === 'UNREAD').length : 0;
  const totalCount = Array.isArray(notifications) ? notifications.length : 0;

  const renderNotifications = (notifList) => {
    if (!notifList || notifList.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          Không có thông báo
        </div>
      );
    }

    return notifList.map((notification) => {
      const iconInfo = getNotificationIcon(notification.type);
      const isNew = new Date() - new Date(notification.createdAt) < 300000; // 5 phút

      return (
        <div
          key={notification._id}
          onClick={() => notification.status === 'UNREAD' && onMarkAsRead?.(notification._id)}
          className={`flex items-start gap-3 p-4 rounded-lg transition-all border cursor-pointer ${
            notification.status === 'UNREAD'
              ? "bg-orange-500/5 border-orange-500/20 hover:bg-orange-500/10"
              : "bg-card border-transparent hover:bg-muted/50"
          }`}
        >
          <div className="flex items-center justify-center w-3 pt-1 shrink-0">
            {notification.status === 'UNREAD' && (
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
            )}
          </div>
          <div
            className={`p-2 rounded-full shrink-0 ${iconInfo.bg} ${iconInfo.color}`}
          >
            {getIcon(iconInfo.icon)}
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <p
              className={`text-sm ${
                notification.status === 'UNREAD'
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {notification.title}
            </p>
            <p className="text-sm text-muted-foreground">
              {notification.message}
            </p>
            <p className="text-xs text-muted-foreground/60">
              {formatTime(notification.createdAt)}
            </p>
          </div>
          {isNew && (
            <div className="shrink-0 self-center">
              <Badge className="text-xs bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">
                Mới
              </Badge>
            </div>
          )}
        </div>
      );
    });
  };

  const renderNotificationsByCategory = (category) => {
    return renderNotifications(categorizedNotifs[category]);
  };

  return (
    <main>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Thông báo</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Quản lý tất cả thông báo của nhà hàng
            </p>
          </div>
          <Button 
            variant="outline" 
            className="gap-2" 
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0 || loading}
          >
            <CheckCheck className="w-4 h-4" />
            Đọc tất cả
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner className="w-8 h-8" />
          </div>
        ) : (
        <Tabs defaultValue="all" className="overflow-x-auto">
          <TabsList className="w-fit justify-start bg-gray-200">
            <TabsTrigger
              value="all"
              className="gap-2 data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-500"
            >
              Tất cả
              <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                {totalCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="gap-2 data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-500"
            >
              Chưa đọc
              <Badge
                variant="destructive"
                className="h-5 px-1.5 text-xs bg-red-500"
              >
                {unreadCount}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <Card className="rounded-lg border">
              <div className="p-2">
                <div className="space-y-4">
                    {categorizedNotifs.recent.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
                          VỪA XONG
                        </p>
                        <div className="space-y-1">
                          {renderNotificationsByCategory("recent")}
                        </div>
                      </div>
                    )}

                    {categorizedNotifs.today.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
                          HÔM NAY
                        </p>
                        <div className="space-y-1">
                          {renderNotificationsByCategory("today")}
                        </div>
                      </div>
                    )}

                    {categorizedNotifs.yesterday.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
                          HÔM QUA
                        </p>
                        <div className="space-y-1">
                          {renderNotificationsByCategory("yesterday")}
                        </div>
                      </div>
                    )}

                    {totalCount === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        Không có thông báo
                      </div>
                    )}
                  </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="unread" className="mt-4">
            <Card className="rounded-lg border">
              <div className="p-2">
                <div className="space-y-4">
                    {categorizedUnreadNotifs.recent.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
                          VỪA XONG
                        </p>
                        <div className="space-y-1">
                          {renderNotifications(categorizedUnreadNotifs.recent)}
                        </div>
                      </div>
                    )}

                    {categorizedUnreadNotifs.today.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
                          HÔM NAY
                        </p>
                        <div className="space-y-1">
                          {renderNotifications(categorizedUnreadNotifs.today)}
                        </div>
                      </div>
                    )}

                    {categorizedUnreadNotifs.yesterday.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
                          HÔM QUA
                        </p>
                        <div className="space-y-1">
                          {renderNotifications(categorizedUnreadNotifs.yesterday)}
                        </div>
                      </div>
                    )}

                    {unreadCount === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        Không có thông báo chưa đọc
                      </div>
                    )}
                  </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        )}
      </div>
    </main>
  );
};

export default NotificationManagement;
